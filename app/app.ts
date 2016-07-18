/**
 * This is the entry point of admin.huluwa.uk
 */

import { Component }         from '@angular/core';

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
        MenuComponent,
    ]
})
export class App
{
    constructor(private menuService: MenuService,
                private authService: AuthService) {}
}
