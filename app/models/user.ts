/**
 * This defines the user model such as author, editor, etc
 */

export const USER_ROLES = [
    'customer', 'administrator', 'shop_manager', 'editor', 'author'
];

export const USER_GENDERS = [
    {key: 'M', display_name: '男性'},
    {key: 'F', display_name: '女性'},
    {key: 'U', display_name: '火星人'}
];

interface UserRole {
    id: number;
    name: string;
    display_name: string;
    description: string;
}

interface UserProfile {
    gender: string; /* ENUM, One of 'M', 'F' or 'U' */
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

// API request parameters to filter list of users
export class UserParams {
    cur_page: string = '1';
    datetype: string;
    datefrom: string;
    dateto: string;
    query: string;
    // Form a API query string
    toQueryString(): string {
        let s = '?page=' + this.cur_page;
        if (this.datetype) s = s + '&datetype=' + this.datetype;
        if (this.datefrom) s = s + '&datefrom=' + this.datefrom;
        if (this.dateto) s = s + '&dateto=' + this.dateto;
        if (this.query) s = s + '&query=' + this.query;
        return s;
    }
}

/* This user is per domain data */
export class User {
    id: number;
    role_id: number;
    uuid: string;
    name: string;
    display_name: string;
    email: string;
    password: string;
    created_at: string;

    role: UserRole;
    profile: UserProfile;
}
