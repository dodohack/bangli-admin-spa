/**
 * RESTful application server APIs, routes are relative to '/admin'.
 * Naming conventions under RESTful standard, using http method
 * 'get', 'post', 'put', 'delete' as standard operations.
 * APIs with suffix 'batch' is used to 'put' and 'delete' list of entities.
 */
export const API_HULUWA = {
    /* Base migration url of API server */
    migrate_base: '/migrate',
    /* Initial migration with empty user table */
    migrate_user_stage1: '/migrate/user_stage1',
    /* Incremental migration */
    migrate_user_stage2: '/migrate/user',

    /* Authentication callback with JWT token */
    register_callback: '/register',
    
    /* Beacon, test if API server online, can carry optional data */
    ping: '/ping',

    /* Retrieve users, authors, editors etc; Retrieve/update single user */
    users: '/users',
    /* Update users */
    users_batch: '/users/batch',
    /* List of user roles */
    users_roles: '/users/roles',

    /*************************************************************************
     * CMS
     *************************************************************************/
    /* Cms attributes includes available authors, editors, categories etc */
    cms_attrs:       '/cms/attributes',
    /* List of posts */
    cms_posts:       '/cms/posts',
    cms_posts_batch: '/cms/posts/batch',
    /* List of post statuses */
    cms_post_states: '/cms/posts/states',

    /* Categories/Category */
    cms_cats:       '/cms/categories',
    cms_cats_batch: '/cms/categories/batch',

    /* Tags/Tag */
    cms_tags:       '/cms/tags',
    cms_tags_batch: '/cms/tags/batch',

    /* List of topics available for given post */
    cms_topic_cats: '/cms/topic_cats',

    /* Topics/Topic */
    cms_topics:       '/cms/topics',
    cms_topics_batch: '/cms/topics/batch',

    /* Pages/Page */
    cms_pages:       '/cms/pages',
    cms_pages_batch: '/cms/pages/batch',

    /* Pages status */
    cms_page_states: '/cms/pages/states',

    /* List of topic statuses */
    cms_topic_states: '/cms/topics/states',

    /*************************************************************************
     * Shop
     *************************************************************************/

    /* Orders/Order */
    shop_orders:       '/shop/orders',
    shop_orders_batch: '/shop/orders/batch',

    /* Order states */
    shop_order_states: '/shop/orders/states',

    /* Products/Product */
    shop_products:       '/shop/products',
    shop_products_batch: '/shop/products/batch',

    /* Products states */
    shop_product_states: '/shop/products/states',

    /* Categories/Category */
    shop_cats:       '/shop/categories',
    shop_cats_batch: '/shop/categories/batch',

    /* Tags/Tag */
    shop_tags:        '/shop/tags',
    shop_tags_batch:  '/shop/tags/batch',

    /*************************************************************************
     * Emails
     *************************************************************************/

    /*************************************************************************
     * Affiliate
     *************************************************************************/

    /*************************************************************************
     * More
     *************************************************************************/
};
