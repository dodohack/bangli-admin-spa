/**
 * RESTful application server APIs, routes are relative to '/admin'.
 * Naming conventions under RESTful standard, using http method
 * 'get', 'post', 'put', 'delete' as standard operations.
 * APIs with suffix 'batch' is used to 'put' and 'delete' list of entities.
 */
export const API_PATH = {
    /* Base migration url of API server */
    migrate_base: '/migrate',
    /* Initial migration with empty user table */
    migrate_user_stage1: '/migrate/user_stage1',
    /* Incremental migration */
    migrate_user_stage2: '/migrate/user',

    /* Authentication callback with JWT token */
    register_callback: '/register',

    /* Login in app server with token from auth server, get domain specific profile */
    login: '/login',

    /* Retrieve users, authors, editors etc; Retrieve/update single user */
    users: '/users',
    /* Update users */
    users_batch: '/users/batch',
    /* List of user roles */
    users_roles: '/users/roles',

    /* Beacon, test if API server online, can carry optional data */
    ping: '/ping',

    /*************************************************************************
     * CMS
     *************************************************************************/
    /* Cms attributes includes available authors, editors, categories etc */
    cms_attrs:       '/cms/attributes',
    /* List of posts */
    cms_posts:       '/cms/posts',
    cms_posts_batch: '/cms/posts/batch',
    /* List of post statuses */
    cms_post_statuses: '/cms/posts/statuses',

    /* Categories/Category */
    cms_cats:       '/cms/categories',
    cms_cats_batch: '/cms/categories/batch',

    /* Type of topics */
    cms_topic_types: '/cms/topic_types',
    cms_topic_types_batch: '/cms/topic_types/batch',

    /* Tags/Tag */
    cms_tags:       '/cms/tags',
    cms_tags_batch: '/cms/tags/batch',

    /* List of topics available for given post */
    cms_topic_cats: '/cms/topic_cats',

    /* Topics/Topic */
    cms_topics:       '/cms/topics',
    cms_topics_batch: '/cms/topics/batch',

    /* Offer */
    cms_offers:        '/cms/offers',
    cms_offers_batch:  '/cms/offers/batch',

    /* Pages/Page */
    cms_pages:       '/cms/pages',
    cms_pages_batch: '/cms/pages/batch',

    /* Pages statuses */
    cms_page_statuses: '/cms/pages/statuses',

    /* List of topic statuses */
    cms_topic_statuses: '/cms/topics/statuses',

    /*************************************************************************
     * Advertisement
     *************************************************************************/
    advertises:       '/advertises',
    advertises_batch: '/advertises/batch',

    /*************************************************************************
     * Geo locations
     *************************************************************************/
    geo_locations:       '/locations',
    geo_locations_batch: '/locations/batch',

    /*************************************************************************
     * Emails
     *************************************************************************/
    newsletter_posts:        '/newsletter/posts',
    newsletter_posts_batch:  '/newsletter/posts/batch',

    /*************************************************************************
     * Attachments
     *************************************************************************/
    attachments:        '/attachments',
    attachments_batch:  '/attachments/batch',
    // Return images that supported by froala image manager
    //froala_images:      '/froala-images',
    /* File upload */
    //file_upload:        '/file/upload',

    /*************************************************************************
     * Comments
     *************************************************************************/
    comments:          '/comments',
    comments_batch:    '/comments/batch',

    /*************************************************************************
     * More
     *************************************************************************/

    /*************************************************************************
     * System
     *************************************************************************/
    sys_attrs:          '/sys/attributes',

    /*************************************************************************
     * Menu setting
     *************************************************************************/
    fe_menus:            '/fe_menus',
    fe_menus_batch:      '/fe_menus/batch',
};
