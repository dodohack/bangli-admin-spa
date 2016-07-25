/**
 * This is the entry point of admin.huluwa.uk
 */

import { Component }         from '@angular/core';
import { Router }            from '@angular/router';

import { AuthService }       from './service/auth.service';

import { AuthComponent }     from './authentication';
import { BackendComponent }  from './backend';

@Component({
    selector: 'huluwa-admin',
    template:
    `
    <!-- User registration/login/reset-password etc -->
    <div *ngIf="!isLoggedIn">
        <authentication></authentication>
    </div>
    <div *ngIf="isLoggedIn">
        <!-- Guarded backend entry point-->
        <backend></backend>
    </div>
    `,
    directives: [AuthComponent, BackendComponent]
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
