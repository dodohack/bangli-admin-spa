/**
 * This is the entry point of admin.huluwa.uk
 */

import { Component }         from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

// Add the RxJS operators we need in this app.
import './rxjs-operators';

import { MenuService }       from './service/menu.service';

import { MenuComponent }     from './components/menu';

@Component({
    selector: 'huluwa-admin',
    templateUrl: 'app/app.html',
    directives: [
        ROUTER_DIRECTIVES,
        MenuComponent,
    ],
    providers: [MenuService]
})
export class App {

    constructor() {}
}
