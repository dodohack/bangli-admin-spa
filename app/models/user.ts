/**
 * This defines the user model such as author, editor, etc
 */

import { Menu } from '../models';
    
export const USER_ROLES = [
    'customer', 'administrator', 'shop_manager', 'editor', 'author'
];

export class User {
    id: string;
    role: string;
    name: string;
    nicename: string;
    email: string;
}

/* User profile and settings only stored in localStorage */
export class Preference {
    constructor(
        /* Sidebar toggle state */
        public toggleSidebar?: boolean,

        /* List page related */
        public itemsPerList?: number, /* number of items of a list page */
        public detailedItem?: boolean, /* Show extra detail in list item */

        /* Visual experience */
        public menuBgColor?: string, /* Sidebar/topbar background color */
        public menuFontColor?: string, /* Sidebar/topbar font color */
        public mainColor?: string, /* Content background color */


        /* Customized topbar menus */
        public myTopbarMenus?: Menu[],
        /* Customized sidebar menus */
        public mySidebarMenus?: Menu[]
    ) {}

    /* Load preference from localStorage at once */
    load() {}

    /* Save preference to localStorage at once */
    save() {} 
}
