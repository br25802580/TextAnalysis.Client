import { Component, OnInit } from '@angular/core';
import { ProcessService } from './process.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {

text:string;
result:string[];

  constructor(private processService: ProcessService) { }

  ngOnInit() {
    this.text = localStorage.getItem('text');
  }

  process() {
            localStorage.setItem('text', this.text);

    this.processService.post(this.text).subscribe ( result => {
      this.result=result;
      });
  }

}
