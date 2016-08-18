/**
 * This is the entry point of admin.huluwa.uk
 */

import { Component }         from '@angular/core';
import { Router }            from '@angular/router';

import { AuthService }       from './services';
import { UserPreference }    from './preference';

import { AppState }          from './reducers';

let t = require('./app.html');
@Component({
    selector: 'admin-spa',
    template: t
})
export class App
{
    constructor(private authService: AuthService,
                private router: Router) {

        // Redirect un-authenticated user to login page
        // TODO: Check user permission as well
        /*
        if (!this.authService.isLoggedIn) {
            this.router.navigate(['/login']);
        }
        */
    }

    get isLoggedIn() { return false; /*return this.authService.isLoggedIn;*/ }
    get toggleSidebar() { return UserPreference.toggleSidebar(); }
}
