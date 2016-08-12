import { Component } from '@angular/core';

import { DomainService }  from '../service';
import { SIDEBAR_MENUS }  from '../models/menu';
import { UserPreference } from '../preference';

@Component({
    selector: 'sidebar',
    template:
    `
    <div class="sidebar" [style.background-color]="menuBgColor" [class.icon_sidebar]="toggleSidebar">
        <a class="toggle" (click)="setToggleSidebar($event)" 
        [style.color]="menuColor"><i class="fa fa-ellipsis-v"></i></a>
        <ul class="fixed-menu">
            <li *ngFor="let menu of menus">
                <a [routerLink]="['/', menu.slug]"
                   [style.color]="menuColor"
                   title="{{ menu.name }}" 
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
    constructor(private domainService: DomainService) {
        //this.username = authService.getName();
    }

    get menus() { return SIDEBAR_MENUS[this.domainService.curDomain.key]; }

    get toggleSidebar()   { return UserPreference.toggleSidebar(); }
    get menuColor()   { return UserPreference.menuColor(); }
    get menuBgColor() { return UserPreference.menuBgColor(); }

    public setToggleSidebar($event) { UserPreference.setToggleSidebar(); }
    
}
