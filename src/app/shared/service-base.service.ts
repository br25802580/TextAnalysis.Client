import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServiceBase {

    constructor(protected http: Http) { }

    //************************************//
    //Extract relevant data from http response
    //************************************//
    protected extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    //************************************//
    //Handle error of http response
    //************************************//
    protected handleError(error: Response | any) {
        // In a real world app, We might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}