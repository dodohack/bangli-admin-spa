/* Get all the frontend menus from api server */

import { Injectable }               from '@angular/core';
import { Jsonp, URLSearchParams }   from '@angular/http';
import { Observable }               from 'rxjs/Observable';

/* RESTful API */
import { API } from '../app.api';

@Injectable()
export class MenuService {
    public menus : Observable<string[]>;

    constructor(private jsonp: Jsonp) {}

    public getMenus() {
        let params = new URLSearchParams;
        params.set('callback', 'JSONP_CALLBACK');

        return this.jsonp
            .get(API.menu, { search: params })
            .map(res => res.json());
    }
}
