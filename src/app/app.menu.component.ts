import {Component,Input,OnInit,EventEmitter,ViewChild,Inject,forwardRef} from '@angular/core';
import {trigger,state,style,transition,animate} from '@angular/animations';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/primeng';
import {AppComponent} from './app.component';

@Component({
    selector: 'app-menu',
    template: `
        <ul  root="true" class="ultima-menu ultima-main-menu clearfix" visible="true">
            <li [ngClass]="{'active-menuitem': isActive(i)}" *ngFor="let item of model; let i = index">        
        <a  class="ripplelink" 
                    [routerLink]="item.routerLink" routerLinkActive="active-menuitem-routerlink" [routerLinkActiveOptions]="{exact: true}">
                    <i class="material-icons">{{item.icon}}</i>
                    <span>{{item.label}}</span>
                </a>
       </li>
        </ul>
    `
})
export class AppMenuComponent implements OnInit {

    @Input() reset: boolean;

    model: any[];
    activeIndex: number;

    constructor(@Inject(forwardRef(() => AppComponent)) public app:AppComponent) {}
    
    ngOnInit() {
        this.model = [
            {label: 'Dashboard', icon: 'dashboard', routerLink: ['/']},
            {label: 'Process', icon: 'dashboard', routerLink: ['/process']},
            {label: 'Settings', icon: 'dashboard', routerLink: ['/settings']},
        ];
    }

    changeTheme(theme) {
        let themeLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('theme-css');
        let layoutLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('layout-css');
        
        themeLink.href = 'assets/theme/theme-' + theme +'.css';
        layoutLink.href = 'assets/layout/css/layout-' + theme +'.css';
    }

     isActive(index: number): boolean {
        return this.activeIndex === index;
    }
}

@Component({
    selector: '[app-submenu]',
    template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'active-menuitem': isActive(i)}" *ngIf="child.visible === false ? false : true">
                <a (click)="itemClick($event,child,i)" class="ripplelink" *ngIf="child.routerLink"
                    [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink" [routerLinkActiveOptions]="{exact: true}" [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                    <i class="material-icons">{{child.icon}}</i>
                    <span>{{child.label}}</span>
                    <i class="material-icons" *ngIf="child.items">keyboard_arrow_down</i>
                </a>
            </li>
        </ng-template>
    `,
    animations: [
        trigger('children', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppSubMenu {

    @Input() item: MenuItem;
    
    @Input() root: boolean;
    
    @Input() visible: boolean;

    _reset: boolean;
        
    activeIndex: number;

    constructor(@Inject(forwardRef(() => AppComponent)) public app:AppComponent, public router: Router, public location: Location) {}
        
    itemClick(event: Event, item: MenuItem, index: number) {
        //avoid processing disabled items
        if(item.disabled) {
            event.preventDefault();
            return true;
        }
        
        //activate current item and deactivate active sibling if any
        this.activeIndex = (this.activeIndex === index) ? null : index;
                
        //execute command
        if(item.command) {
            if(!item.eventEmitter) {
                item.eventEmitter = new EventEmitter();
                item.eventEmitter.subscribe(item.command);
            }
            
            item.eventEmitter.emit({
                originalEvent: event,
                item: item
            });
        }

        //prevent hash change
        if(item.items || (!item.url && !item.routerLink)) {
            event.preventDefault();
        }
        
        //hide menu
        if(!item.items) {
            if(this.app.isHorizontal())
                this.app.resetMenu = true;
            else
                this.app.resetMenu = false;
                
            this.app.overlayMenuActive = false;
            this.app.staticMenuMobileActive = false;
        }
    }
    
    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

    @Input() get reset(): boolean {
        return this._reset;
    }

    set reset(val:boolean) {
        this._reset = val;

        if(this._reset && this.app.isHorizontal()) {
            this.activeIndex = null;
        }
    }
}