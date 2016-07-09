/**
 * This is the entry point of admin.huluwa.uk
 */

import { Component }         from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

// Add the RxJS operators we need in this app.
import './rxjs-operators';

import { MenuService }       from './service/menu.service';

import { MenuComponent }     from './components/menu';

//import { RegisterForm } from './auth/register.form';

@Component({
    selector: 'huluwa-admin',
    templateUrl: 'app/app.html',
    directives: [
        ROUTER_DIRECTIVES,
        MenuComponent,
        //RegisterForm,
    ],
    providers: [MenuService]
})
export class App {

    constructor() {}
}
