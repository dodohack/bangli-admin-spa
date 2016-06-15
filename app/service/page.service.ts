/* Get a single page object from api server */

import { Injectable }  from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import { Observable }  from 'rxjs/Observable';

//Global constants
import constants = require('../constants');

@Injectable()
export class PageService {
    public page : Observable<string[]>;
    constructor(private jsonp: Jsonp) {}
    
    public getPage(slug) {
        let params = new URLSearchParams;
        params.set('callback', 'JSONP_CALLBACK');
        
        return this.jsonp
            .get(constants.api_page + '/' + slug, { search: params })
            .map(res => res.json());
    }
}

