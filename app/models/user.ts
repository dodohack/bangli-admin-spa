/**
 * This defines the user model such as author, editor, etc
 */


    
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
export class UserSetting {
    constructor(
        /* List page related */
        public itemsPerList?: number, /* number of items of a list page */
        public detailedItem?: boolean, /* Show extra detail in list item */

        /* Visual experience */
        public menuBgColor?: string, /* Sidebar/topbar background color */
        public menuFontColor?: string /* Sidebar/topbar font color */

        /* Customized topbar links */
    ) {

    }
}
