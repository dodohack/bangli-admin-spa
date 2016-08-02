import { Component } from '@angular/core';

import { PreferenceService } from '../service';

import { SIDEBAR_MENUS } from '../models/menu';

@Component({
    selector: 'sidebar',
    template:
    `
    <div class="sidebar" [style.background-color]="preference.menuBgColor">
        <a class="toggle" [style.color]="preference.menuColor"><i class="fa fa-ellipsis-v"></i></a>
        <ul>
            <li *ngFor="let menu of sidebarMenus">
                <a [routerLink]="['/', menu.slug]"
                   [style.color]="preference.menuColor"
                   title="{{ menu.name }}" 
                   routerLinkActive="active">
                    <i class="{{ menu.icon_style }}"></i>
                    <span>{{ menu.name }}</span>
                </a>
            </li>
        </ul>
    </div>
    `,
    providers: [ PreferenceService ]
})
export class SidebarComponent {
    constructor(private preferenceService: PreferenceService
                /*private authService: AuthService*/) {
        //this.username = authService.getName();
    }

    get sidebarMenus() { return SIDEBAR_MENUS; }
    get preference() { return this.preferenceService; }
}