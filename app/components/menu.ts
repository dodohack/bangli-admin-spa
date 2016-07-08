import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MenuService }       from '../service/menu.service';


@Component({
    selector: 'menu',
    templateUrl: 'app/components/menu.html',
    directives: [ROUTER_DIRECTIVES]
})
export class MenuComponent implements OnInit {

    /* Topbar menu and sidebar menu */
    topbar_menus:  any;
    sidebar_menus: any;

    constructor(private menuService: MenuService) {}

    ngOnInit() { this.getMenus(); }

    getMenus() {
        this.menuService.getMenus()
            .subscribe(
                menus => {
                    this.topbar_menus = menus['admin-topbar'];
                    this.sidebar_menus = menus['admin-sidebar'];
                },
                error => console.error(error)
            )
    }
}