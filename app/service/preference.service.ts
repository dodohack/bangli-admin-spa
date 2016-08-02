/**
 * Interface to get and set user preferences
 */
import { Injectable } from '@angular/core';

import { Menu } from '../models';
//import { Preference } from '../models/user';

@Injectable()
export class PreferenceService
{
    /* Sidebar toggle state */
    public toggleSidebar: boolean;

    /* List page related */
    public itemsPerList: number; /* number of items of a list page */
    public showRichList: boolean; /* Show extra detail in list item */

    /* Visual experience */
    /* FIXME: Anchor[hover] color is overwritten by menuColor!! */
    public menuColor: string; /* Sidebar/topbar font color */
    public menuBgColor: string; /* Sidebar/topbar background color */
    public bodyBgColor: string; /* <body> background color */
    public contentBgColor: string; /* Content background color */

    /* Customized topbar menus */
    public myTopbarMenus: Menu[];
    /* Customized sidebar menus */
    public mySidebarMenus: Menu[];

    constructor() {
        console.log("PreferenceService init");
        this.toggleSidebar = localStorage.getItem('user.toggleSidebar') ?
            localStorage.getItem('user.toggleSidebar') : false;

        this.itemsPerList  = localStorage.getItem('user.itemsPerList') ?
            localStorage.getItem('user.itemsPerList') : 20;

        this.showRichList  = localStorage.getItem('user.showRichList') ?
            localStorage.getItem('user.showRichList') : false;

        this.menuBgColor   = localStorage.getItem('user.menuBgColor') ?
            localStorage.getItem('user.menuBgColor') : '#383838';

        this.menuColor = localStorage.getItem('user.menuColor') ?
            localStorage.getItem('user.menuColor') : '#FFFFFF';

        this.bodyBgColor   = localStorage.getItem('user.bodyBgColor') ?
            localStorage.getItem('user.bodyBgColor') : '#EEEEEE';

        this.contentBgColor = localStorage.getItem('user.contentBgColor') ?
            localStorage.getItem('user.contentBgColor') : '#FFFFFF';

        this.myTopbarMenus = localStorage.getItem('user.myTopbarMenus') ?
            JSON.parse(localStorage.getItem('user.myTopbarMenus')) : [];

        // TODO: Delete this test data
        //this.myTopbarMenus.push(new Menu('test', 'test', '/test_url', 0, 'fa fa-circle-o'));

        this.mySidebarMenus = localStorage.getItem('user.mySidebarMenus') ?
            JSON.parse(localStorage.getItem('user.mySidebarMenus')) : [];
    }

    /**
     * Load all settings
     */
    public load() {
        this.toggleSidebar = localStorage.getItem('user.toggleSidebar');
        this.itemsPerList  = localStorage.getItem('user.itemsPerList');
        this.showRichList  = localStorage.getItem('user.showRichList');
        this.menuBgColor   = localStorage.getItem('user.menuBgColor');
        this.menuColor     = localStorage.getItem('user.menuColor');
        this.contentBgColor = localStorage.getItem('user.contentBgColor');
        this.bodyBgColor   = localStorage.getItem('user.bodyBgColor');
        this.myTopbarMenus = JSON.parse(localStorage.getItem('user.myTopbarMenus'));
        this.mySidebarMenus = JSON.parse(localStorage.getItem('user.mySidebarMenus'));
    }

    /**
     * Save all settings
     */
    public save() {
        localStorage.setItem('user.toggleSidebar', this.toggleSidebar.toString());
        localStorage.setItem('user.itemsPerList', this.itemsPerList.toString());
        localStorage.setItem('user.showRichList', this.showRichList.toString());
        localStorage.setItem('user.menuColor', this.menuColor);
        localStorage.setItem('user.menuBgColor', this.menuBgColor);
        localStorage.setItem('user.contentBgColor', this.contentBgColor);
        localStorage.setItem('user.bodyBgColor', this.bodyBgColor);
        localStorage.setItem('user.myTopbarMenus', JSON.stringify(this.myTopbarMenus));
        localStorage.setItem('user.mySidebarMenus', JSON.stringify(this.mySidebarMenus));
    }
}