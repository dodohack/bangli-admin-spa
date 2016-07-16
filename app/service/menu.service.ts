/**
 * Get dashboard menus from API server
 */

import { Injectable }               from '@angular/core';
import { Jsonp, Headers, URLSearchParams }   from '@angular/http';
import { Observable }               from 'rxjs/Observable';

import { AuthService } from './auth.service';

import { APP } from '../app.api';

@Injectable()
export class MenuService {
    public menus : Observable<string[]>;

    constructor(private jsonp: Jsonp, private authService: AuthService) {
        console.log("MenuService Object Created");
    }

     public getMenus() {
        let params = new URLSearchParams;
        params.set('callback', 'JSONP_CALLBACK');

        /*
         * FIXME: We should have a commonlized position to always set this
         * parameter: token.
         */
        if (this.authService.isLoggedIn())
            params.append('token', this.authService.getJwt());

        /* FIXME: This is not working as we can't see any header is with the request */
        //let headers = new Headers({'Authorization': 'Bearer ' + localStorage.getItem('jwt')});

         /*
          * FIXME: We shouldn't call this at every time, this should be stored
          * into a data memeber.
          */
         return this.jsonp
            .get(APP.menu, {search: params})
            .map(res => res.json());
    }
}
