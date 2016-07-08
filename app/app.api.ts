/**
 * Definition of RESTful API endpoint
 */

/* This should be https://api.huluwa.uk in product env */
const base: string = 'http://localhost:8000'; //'http://alpha-api.huluwa.uk';

export const API = {
    /* Menus */
    menu: base + '/admin/menu',

    /* List of orders */
    //orders: base + '/admin/orders',

    /* Order, param: order_id */
    //order:  base + '/admin/order',
};
