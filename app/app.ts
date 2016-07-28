/**
 * This is the entry point of admin.huluwa.uk
 */

import { Component }         from '@angular/core';
import { Router }            from '@angular/router';

import { AuthService }       from './service/auth.service';
import { SidebarComponent }  from './components/sidebar.component';
import { TopbarComponent }   from './components/topbar.component';

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

        // Redirect un-authenticated user to login page
        // TODO: Check user permission as well
        if (!this.authService.isLoggedIn) {
            this.router.navigate(['/login']);
        }
    }

    get isLoggedIn() {
        return this.authService.isLoggedIn;
    }
}
