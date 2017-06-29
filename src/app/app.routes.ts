import {Routes,RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {DashboardDemo} from './demo/view/dashboarddemo';
import { ProcessComponent } from './process/process.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
    {path: '', component: DashboardDemo},
    {path: 'dashboard', component: DashboardDemo},
    {path: 'process', component: ProcessComponent},
    {path: 'settings', component: SettingsComponent},
];


export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
