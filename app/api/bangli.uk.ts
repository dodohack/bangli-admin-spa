/**
 * Definition of RESTful API endpoint
 */

/* This should be https://api.bangli.uk in product env */
const base: string = 'http://localhost:6000';

/* Application server APIs */
export const API_BANGLI_UK = {
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
    /* Get users who can edit all posts, includes editor, shop_manager etc */
    editors: base + '/admin/editors',

    /* List of posts */
    posts: base + '/admin/posts',
    /* List of post statuses */
    post_statuses: base + '/admin/posts/statuses',
    /* Single post */
    post: base + '/admin/post',
    /* CMS categories */
    cms_cats: base + '/admin/categories/cms',
    /* CMS tags */
    cms_tags: base + '/admin/tags/cms',
    /* CMS topics available to post */
    cms_topics: base + '/admin/topics/cms',

    /* List of pages */
    pages: base + '/admin/pages',
    /* Pages status */
    page_statuses: base + '/admin/pages/statuses',

    /* List of topics */
    topics: base + '/admin/topics',
    /* Topics list page filter menu */
    topic_statuses: base + '/admin/topics/statuses',
    /* Single topic */
    topic: base + '/admin/topic',

    /* List of orders */
    orders: base + '/admin/orders',
    /* List of order statuses */
    order_statuses: base + '/admin/orders/statuses',
    /* Single order */
    order:  base + '/admin/order',

    /* List of products */
    products: base + '/admin/products',
    /* Products list page filter menu */
    product_statuses: base + '/admin/products/statuses',
    /* Single product */
    product:  base + '/admin/product',
    /* Product categories */
    product_cats: base + '/admin/categories/product',
    /* Product tags */
    product_tags: base + '/admin/tags/product',
};
