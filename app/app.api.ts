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
    /* Users list page filter menu */
    menu_users: base + '/admin/menu/users',

    /* Get users who can edit a post, includes author, editor, shop_manager etc */
    authors: base + '/admin/authors',

    /* List of posts */
    posts: base + '/admin/posts',
    /* Posts list page filter menu */
    menu_posts: base + '/admin/menu/posts',
    /* Single post */
    post: base + '/admin/post',

    /* List of topics */
    topics: base + '/admin/topics',
    /* Topics list page filter menu */
    menu_topics: base + '/admin/menu/topics',
    /* Single topic */
    topic: base + '/admin/topic',

    /* List of orders */
    orders: base + '/admin/orders',
    /* Orders list page filter menu */
    menu_orders: base + '/admin/menu/orders',
    /* Single order */
    order:  base + '/admin/order',

    /* List of products */
    products: base + '/admin/products',
    /* Products list page filter menu */
    menu_products: base + '/admin/menu/products',
    /* Single product */
    product:  base + '/admin/product',
    /* Product categories */
    product_cats: base + '/admin/categories/product',
};

/* Authentication server APIs */
export const AUTH = {
    endpoint: auth_base,

    /* Authentcation with email/password */
    register: auth_base + '/register',
    login: auth_base + '/login',
}