/**
 * This is the entry point of admin.huluwa.uk
 */

import { Component, OnInit }           from '@angular/core';
import { ROUTER_DIRECTIVES }           from '@angular/router';
import { Observable }                  from 'rxjs/Observable';

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
export class App implements OnInit {
    //menus: Observable<string[]>;

    menu2: any;

    constructor(private menuService: MenuService) {
        //this.menus = menuService.menus;
        //console.log("app init: " + this.menus);
    }

    ngOnInit() { this.getMenus(); }

    getMenus() {
        this.menuService.getMenus()
            .subscribe(
                menus => this.menu2 = menus,
                error => console.error(error),
                ()    => console.log('Done!')
            );
    }
}
