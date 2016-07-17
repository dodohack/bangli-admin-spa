/**
 * This is the entry point of admin.huluwa.uk
 */

import { Component }         from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

// Add the RxJS operators we need in this app.
import './rxjs-operators';

import { AuthService }       from './service/auth.service';
import { MenuService }       from './service/menu.service';

import { MenuComponent }     from './shared/menu';

/**
 * Inject globally used DI at top level, so we can use the singleton everywhere,
 * see singleton service at
 * https://angular.io/docs/ts/latest/guide/dependency-injection.html
 * for detail.
 */
@Component({
    selector: 'huluwa-admin',
    templateUrl: 'app/app.html',
    directives: [
        ROUTER_DIRECTIVES,
        MenuComponent,
    ]
})
export class App
{
    constructor(private menuService: MenuService,
                private authService: AuthService) {}

    get isLoggedIn()
    {
        return this.authService.isLoggedIn();
    }

    /**
     * FIXME: This function shouldn't be here
     */
    get isSidebarToggled()
    {
        if (localStorage.getItem('toggle') === '1')
            return true;

        return false;
    }
}
