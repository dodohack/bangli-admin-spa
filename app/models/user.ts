/**
 * This defines the user model such as author, editor, etc
 */

import { Menu } from '../models';
    
export const USER_ROLES = [
    'customer', 'administrator', 'shop_manager', 'editor', 'author'
];

export const USER_GENDERS = [
    {key: 'M', display_name: '男性'},
    {key: 'F', display_name: '女性'},
    {key: 'U', display_name: '火星人'}
];

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

export class UserRole {
    id: number;
    name: string;
    display_name: string;
    description: string;
}

export class UserProfile {
    gender: string; /* One of 'M', 'F' or 'U' */
    first_name: string;
    last_name: string;
    birthday: string;
    point_available: number;
    point_used: number;
    currency: string;
    money_available: number;
    money_spent: number;
    order_count: number;
    cart_items: Object;
    profile_image: string;
    subscription: boolean;
    description: string;
}

export class User {
    id: number;
    role_id: number;
    name: string;
    display_name: string;
    email: string;
    created_at: string;
    
    role: UserRole;
    profile: UserProfile;
}
