import { Component } from '@angular/core';

import { SidebarMenus } from '../models/sidebar-menus';

@Component({
    selector: 'sidebar',
    template:
    `
    <div class="sidebar">
        <a class="toggle"><i class="fa fa-ellipsis-v"></i></a>
        <ul>
            <li *ngFor="let menu of sidebarMenus">
                <a [routerLink]="['/', menu.slug]" title="{{ menu.name }}" 
                   routerLinkActive="active">
                    <i class="{{ menu.icon_style }}"></i>
                    <span>{{ menu.name }}</span>
                </a>
            </li>
        </ul>
    </div>
    `
})
export class SidebarComponent {

    sidebarMenus: any = SidebarMenus;

    /* username: string; */

    constructor(/*private authService: AuthService*/) {
        //this.username = authService.getName();
    }
}