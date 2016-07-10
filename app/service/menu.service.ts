/**
 * Get dashboard menus from API server
 */

import { Injectable }               from '@angular/core';
import { Jsonp, Headers, URLSearchParams }   from '@angular/http';
//import { Observable }               from 'rxjs/Observable';

import { AuthService } from './auth.service';

import { API } from '../app.api';

@Injectable()
export class MenuService {
    //public menus : Observable<string[]>;

    constructor(private jsonp: Jsonp, private authService: AuthService) {}

    public getMenus() {
        let params = new URLSearchParams;
        params.set('callback', 'JSONP_CALLBACK');

        if (this.authService.isLoggedIn())
            params.append('token', this.authService.getJwt());

        /* FIXME: This is not working as we can't see any header is with the request */
        //let headers = new Headers({'Authorization': 'Bearer ' + localStorage.getItem('jwt')});

        return this.jsonp
            .get(API.menu, {search: params})
            .map(res => res.json());
    }
}
