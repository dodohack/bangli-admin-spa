/**
 * This is the entry point of admin.huluwa.uk
 */

import { Component }         from '@angular/core';
import { Router }            from '@angular/router';

import { AuthService }       from './service';
import { TopbarComponent, SidebarComponent }  from './components';
import { UserPreference } from './preference';

let template = require('./app.html');
@Component({
    selector: 'admin-spa',
    template: template,
    directives: [TopbarComponent, SidebarComponent]
})
export class App
{
    constructor(private authService: AuthService,
                private router: Router) {

        // Redirect un-authenticated user to login page
        // TODO: Check user permission as well
        if (!this.authService.isLoggedIn) {
            this.router.navigate(['/login']);
        }
    }

    get isLoggedIn() { return this.authService.isLoggedIn; }
    get toggleSidebar() { return UserPreference.toggleSidebar(); }
}
