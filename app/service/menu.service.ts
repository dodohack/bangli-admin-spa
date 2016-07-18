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
    
    //public menus : Observable<string[]>;
    
    public toggle: boolean;

    constructor(private jsonp: Jsonp, private authService: AuthService) {
        console.log("MenuService Object Created");
        this.initSidebarToggle();
    }

    /**
     * Retrieve sidebar/topbar data from API server
     * @returns {Observable<R>}
     */
     public getMenus() {
        let params = new URLSearchParams;
        params.set('callback', 'JSONP_CALLBACK');

        /*
         * FIXME: We should have a commonlized position to always set this
         * parameter: token.
         */
        if (this.authService.isLoggedIn)
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
    
    /**
     * Initialize sidebar toggle states
     */
    private initSidebarToggle()
    {
        this.toggle = true;

        let v = localStorage.getItem('toggle');
        if (v === null) {
            this.toggle = false;
            localStorage.setItem('toggle', '0');
        } else if (v === '0') {
            this.toggle = false;
        }
    }
    
    /**
     * Toggle sidebar betwen icon menu and text menu
     * localStorage only stores string, so use '0' and '1' as false and true.
     */
    public toggleSidebar($event)
    {
        this.toggle = !this.toggle;

        if (this.toggle)
            localStorage.setItem('toggle', '1');
        else
            localStorage.setItem('toggle', '0');
    }
}
