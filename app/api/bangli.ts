/**
 * Definition of RESTful API endpoint
 */

/* Application server APIs, relative to path '/admin' */
export const API_BANGLI = {
    /* Base migration url of API server */
    migrate_base: '/migrate',
    /* Initial migration with empty user table */
    migrate_user_stage1: '/migrate/user_stage1',
    /* Incremental migration */
    migrate_user_stage2: '/migrate/user',

    /* Authentication callback with JWT token */
    register_callback: '/register',

    /* Menus */
    menu: '/menu',

    /* List of users */
    users: '/users',
    /* Users list page filter menu */
    user_roles: '/menu/users',

    /* Get users who can edit a post, includes author, editor, shop_manager etc */
    authors: '/authors',
    /* Get users who can edit all posts, includes editor, shop_manager etc */
    editors: '/editors',

    /* List of posts */
    posts: '/posts',
    /* List of post statuses */
    post_statuses: '/posts/statuses',
    /* Single post */
    post: '/post',
    /* CMS categories */
    cms_cats: '/categories/cms',
    /* CMS tags */
    cms_tags: '/tags/cms',
    /* CMS topics available to post */
    cms_topics: '/topics/cms',

    /* List of pages */
    pages: '/pages',
    /* Pages status */
    page_statuses: '/pages/statuses',

    /* List of topics */
    topics: '/topics',
    /* Topics list page filter menu */
    topic_statuses: '/topics/statuses',
    /* Single topic */
    topic: '/topic',

    /* List of orders */
    orders: '/orders',
    /* List of order statuses */
    order_statuses: '/orders/statuses',
    /* Single order */
    order: '/order',

    /* List of products */
    products: '/products',
    /* Products list page filter menu */
    product_statuses: '/products/statuses',
    /* Single product */
    product:  '/product',
    /* Product categories */
    product_cats: '/categories/product',
    /* Product tags */
    product_tags: '/tags/product',
};
