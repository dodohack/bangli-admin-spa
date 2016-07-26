/**
 * This is the entry point of admin.huluwa.uk
 */

import { Component }         from '@angular/core';
import { Router }            from '@angular/router';

import { AuthService }       from './service/auth.service';
import { MenuService }       from './service/menu.service';
import { MenuComponent }     from './shared/menu';

@Component({
    selector: 'huluwa-admin',
    templateUrl: './app.html',
    directives: [MenuComponent],
    providers: [MenuService]
})
export class App
{
    constructor(private authService: AuthService,
                private menuService: MenuService,
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
