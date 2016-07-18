import { Component, OnInit } from '@angular/core';

import { MenuService }       from '../service/menu.service';
import { AuthService }       from '../service/auth.service';

@Component({
    selector: 'topbar-sidebar',
    templateUrl: 'app/shared/menu.html'
})
export class MenuComponent implements OnInit {

    /* Topbar menu and sidebar menu */
    topbar_menus:  any;
    sidebar_menus: any;

    /* username: string; */
    /**
     * FIXME: We can't create a authService object and get the stored jwt.aud from
     * it, see
     * http://stackoverflow.com/questions/34376854/delegation-eventemitter-or-observable-in-angular2/35568924#35568924
     * for better solution.
     */
    constructor(private menuService: MenuService/*,
                private authService: AuthService*/) {
        //this.username = authService.getName();
    }

    ngOnInit() {
        this.menuService.getMenus()
            .subscribe(
                menus => {
                    this.topbar_menus = menus['admin-topbar'];
                    this.sidebar_menus = menus['admin-sidebar'];
                },
                error => console.error(error)
            );
    }
}