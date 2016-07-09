/**
 * Definition of RESTful API endpoint
 */

/* This should be https://api.huluwa.uk in product env */
const base: string = 'http://alpha-api.bangli.uk';

/* Authentication server */
const auth_base: string = 'http://alpha-auth.bangli.uk';

export const API = {
    /* Endpoint */
    endpoint: base,

    /* Authentication */
    register: auth_base + '/register',
    register_callback: base + '/register',

    /* Menus */
    menu: base + '/admin/menu',

    /* List of orders */
    //orders: base + '/admin/orders',

    /* Order, param: order_id */
    //order:  base + '/admin/order',
};
