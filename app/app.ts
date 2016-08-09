/**
 * This is the entry point of admin.huluwa.uk
 */

import { Component }         from '@angular/core';
import { Router }            from '@angular/router';

import { AuthService }       from './service';
import { TopbarComponent, SidebarComponent }  from './components';

import { Domain } from './domain';
import { UserPreference } from './preference';

let template = require('./app.html');
@Component({
    selector: 'huluwa-admin',
    template: template,
    directives: [TopbarComponent, SidebarComponent]
})
export class App
{
    constructor(private authService: AuthService,
                private router: Router) {

        console.log("APP INITIALIZED, CURRENT DOMAIN:", Domain.getKey());

        // Redirect un-authenticated user to login page
        // TODO: Check user permission as well
        if (!this.authService.isLoggedIn) {
            this.router.navigate(['/login']);
        }
    }

    get isLoggedIn() {
        return this.authService.isLoggedIn;
    }

    get toggleSidebar() { return UserPreference.toggleSidebar(); }
}
