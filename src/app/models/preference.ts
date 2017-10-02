/* Dashboard user profile and settings, may sync to server */

import { Menu } from './menu';

export class Preference {
    /* Sidebar toggle state */
    isIconSidebar: boolean;

    /* List page related */
    listItemCount: number; /* number of items of a list page */
    isRichList: boolean; /* Show extra detail in list item */

    /* Visual experience */
    menuBackgroundColor: string; /* Sidebar/topbar background color */
    menuColor: string; /* Sidebar/topbar font color */
    //mainColor: string; /* Content background color */

    /* Customized topbar menus */
    myTopbarMenus: Menu[];
    /* Customized sidebar menus */
    mySidebarMenus: Menu[];
}
