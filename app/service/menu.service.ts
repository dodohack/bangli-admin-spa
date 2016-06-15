/* Get all the frontend menus from api server */

import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

//Global constants
import constants = require('../constants');

@Injectable()
export class MenuService {
    public menus : Observable<string[]>;

    constructor(private jsonp: Jsonp) {}

    public getMenus() {
        let params = new URLSearchParams;
        params.set('callback', 'JSONP_CALLBACK');

        return this.jsonp
            .get(constants.api_pc_fe_menu, { search: params })
            .map(res => res.json());
    }
}
