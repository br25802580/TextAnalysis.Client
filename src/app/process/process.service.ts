import { Injectable } from '@angular/core';
import {ServiceBase} from '../shared/service-base.service'
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { baseApiUrl } from '../shared/app.consts';

@Injectable()
export class ProcessService extends ServiceBase {
  
  private apiUrl = baseApiUrl + 'process/';

  constructor(http: Http) {
            super(http);

   }

   //************************************//
    // Get a specific location data by locationId
    //************************************//
    post(text: string): Observable<any> {
        return this.http.post(this.apiUrl , {Text: text})
            .map(this.extractData)
            .catch(this.handleError);
    }
}
