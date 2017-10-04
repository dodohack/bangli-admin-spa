/*
 * Sidebar menus definition for all websites
 */

/* Sidebar menus used by global bangli network */
export const SIDEBAR_MENUS = [
    {slug: 'dashboard', name: '控制面板', role: 'author',  icon_style: 'fa fa-lg fa-dashboard'},
    {slug: 'post',      name: '文章',    role: 'author',  icon_style: 'fa fa-lg fa-book'},
    {slug: 'topic',     name: '专题',    role: 'editor',  icon_style: 'fa fa-lg fa-circle-o'},
    {slug: 'deal',      name: '优惠',    role: 'editor',  icon_style: 'fa fa-lg fa-circle-o'},
    {slug: 'ads',       name: '广告',    role: 'editor',  icon_style: 'fa fa-lg fa-circle-o'},
    {slug: 'bbs',       name: '社区',    role: 'editor',  icon_style: 'fa fa-lg fa-circle-o'},
    {slug: 'page',      name: '页面',    role: 'editor',  icon_style: 'fa fa-lg fa-circle-o'},
    {slug: 'comment',   name: '评论',    role: 'editor',  icon_style: 'fa fa-lg fa-comment'},
    {slug: 'social',    name: '社交',    role: 'editor',  icon_style: 'fa fa-lg fa-wechat'},
    {slug: 'email',     name: '邮件',    role: 'editor',  icon_style: 'fa fa-lg fa-envelope'},
    {slug: 'attachment',name: '媒体库',  role: 'author',  icon_style: 'fa fa-lg fa-image'},
    {slug: 'user',      name: '用户',    role: 'shop_manager',  icon_style: 'fa fa-lg fa-users'},
    {slug: 'analysis',  name: '数据分析', role: 'shop_manager',  icon_style: 'fa fa-lg fa-bar-chart'},
    {slug: 'setting',   name: '设置',    role: 'administrator',  icon_style: 'fa fa-lg fa-wrench'},
    {slug: 'migration', name: '数据移植', role: 'super_user',    icon_style: 'fa fa-lg fa-database'}
];

/* customized menus on sidebar/topbar */
export class Menu {
    constructor(public slug: string,
                public name: string,
                public url?: string,
                public sort?: number,
                public icon_style?: string,
                public style?: string) {}
}

// Frontend menu data structure
export class FeMenu {
    id: number;
    parent_id: number; // Parent menu id, we use menu with parent_id 0 as menu
                       // selector, each type of menu has 1 menu with parent_id = 0,
                       // So all level 1 menus belong to the menu has the same
                       // parent_id
    device: string;    // DESKTOP or MOBILE
    type: string;      // Menu type
    name: string;      // Menu name, it has special use for menu with parent_id 0
    url:  string;      // Pre-generated menu url
    group: number;     // Do we display menus grouped with group number?
                       // 0: no group, 1 - n: group number

    order: number;     // Order of the menu to display, starts from 1
    external: boolean; // In app link or external link, in app link starts with
                       // '/', external link starts with domain name.
    icon:  string;     // Menu icon class if any
    style: string;     // Extra style apply to the menu if any
}
