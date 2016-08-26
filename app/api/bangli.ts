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


    /*************************************************************************
     * Users
     *************************************************************************/
    /* List of users */
    users: '/users',
    /* List of user roles */
    user_roles: '/user_roles',
    /* Single user */
    user: '/user',
    /* Users can edit own post */
    authors: '/authors',
    /* Users can edit any post */
    editors: '/editors',

    /*************************************************************************
     * CMS
     *************************************************************************/
    /* List of posts */
    cms_posts: '/cms/posts',
    /* List of post statuses */
    cms_post_statuses: '/cms/posts/statuses',
    /* Single post */
    cms_post: '/cms/post',
    /* Categories */
    cms_cats: '/cms/categories',
    /* Tags */
    cms_tags: '/cms/tags',
    /* List of topics */
    cms_topics: '/cms/topics',
    /* Single topic */
    cms_topic: '/cms/topic',
    /* List of pages */
    cms_pages: '/cms/pages',
    /* Single page */
    cms_page: '/cms/page',
    /* Pages status */
    page_statuses: '/cms/pages/statuses',
    /* List of topic statuses */
    cms_topic_statuses: '/cms/topics/statuses',

    /*************************************************************************
     * Deal
     *************************************************************************/
    deals: '/deals',
    deal:  '/deal',
};
