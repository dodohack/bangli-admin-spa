/**
 * Definition of RESTful API endpoint
 */

/* This should be https://api.huluwa.uk in product env */
const base: string = 'http://localhost:5000';

/* Authentication server */
const auth_base: string = 'http://localhost:10000';

/* Application server APIs */
export const APP = {
    /* Endpoint */
    endpoint: base,

    /* Base migration url of API server */
    migrate_base: base + '/admin/migrate',

    /* Initial migration with empty user table */
    migrate_user_stage1: base + '/migrate/user',
    /* Incremental migration */
    migrate_user_stage2: base + '/admin/migrate/user',

    /* Authentication callback with JWT token */
    register_callback: base + '/register',

    /* Menus */
    menu: base + '/admin/menu',

    /* List of users */
    users: base + '/admin/users',
    /* List of user page menu */
    user_menu: base + '/admin/menu/users',

    /* List of orders */
    //orders: base + '/admin/orders',

    /* Order, param: order_id */
    //order:  base + '/admin/order',
};

/* Authentication server APIs */
export const AUTH = {
    endpoint: auth_base,

    /* Authentcation with email/password */
    register: auth_base + '/register',
    login: auth_base + '/login',
}