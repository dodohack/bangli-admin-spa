import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MenuService }       from '../service/menu.service';
import { AuthService }       from '../service/auth.service';

@Component({
    selector: 'topbar-sidebar',
    templateUrl: 'app/shared/menu.html',
    directives: [ROUTER_DIRECTIVES]
})
export class MenuComponent implements OnInit {

    /* Topbar menu and sidebar menu */
    topbar_menus:  any;
    sidebar_menus: any;

    toggle: boolean;

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
        this.initSidebarToggle();

        this.menuService.getMenus()
            .subscribe(
                menus => {
                    this.topbar_menus = menus['admin-topbar'];
                    this.sidebar_menus = menus['admin-sidebar'];
                },
                error => console.error(error)
            );
    }

    /**
     * Initialize sidebar toggle states
     */
    initSidebarToggle()
    {
        this.toggle = true;
        
        let v = localStorage.getItem('toggle');
        if (v === null) {
            this.toggle = false;
            localStorage.setItem('toggle', '0');
        } else if (v === '0') {
            this.toggle = false;
        }
    }

    /**
     * Toggle sidebar betwen icon menu and text menu
     * localStorage only stores string, so use '0' and '1' as false and true.
     */
    toggleSidebar($event)
    {
        this.toggle = !this.toggle;
        
        if (this.toggle)
            localStorage.setItem('toggle', '1');
        else
            localStorage.setItem('toggle', '0');
    }
}