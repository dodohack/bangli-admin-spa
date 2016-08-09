/**
 * Display dashboard user local settings, only users can use dashboard will have
 * this displayed
 */
import { Component } from '@angular/core';
import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap';

import { UserPreference } from '../../preference';

let t = require('./user.preference.html');
@Component({
    selector: 'user-preference',
    template: t,
    directives: [ ACCORDION_DIRECTIVES ]
})
export class UserPreferenceTab
{
    /* Count of items per list page */
    counts = [10, 20, 30, 40, 50, 100, 150, 200];
    
    /* TODO: Do not define them here */
    toggleSidebar = UserPreference.toggleSidebar();
    itemsPerList  =  UserPreference.itemsPerList();
    showRichList  = UserPreference.showRichList();
    menuColor     = UserPreference.menuColor();
    menuBgColor   = UserPreference.menuBgColor();
    contentBgColor  = UserPreference.contentBgColor();
    bodyBgColor   = UserPreference.bodyBgColor();
    myTopbarMenus = UserPreference.myTopbarMenus();
    mySidebarMenus  = UserPreference.mySidebarMenus();

    public save() {
        console.log(this.toggleSidebar, this.itemsPerList,
            this.showRichList,
            this.menuColor,
            this.menuBgColor);

        UserPreference.save(
        this.toggleSidebar,
        this.itemsPerList,
        this.showRichList,
        this.menuColor,
        this.menuBgColor,
        this.contentBgColor,
        this.bodyBgColor,
        this.myTopbarMenus,
        this.mySidebarMenus); 
    }
}
