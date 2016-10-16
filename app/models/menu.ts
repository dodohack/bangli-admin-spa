/*
 * Sidebar menus definition for all websites
 */

/* Sidebar menus used by huluwa management */
const HULUWA_UK_SIDEBAR_MENUS = [
    {slug: 'dashboard', name: '控制面板',  role: 'author',       icon_style: 'fa fa-lg fa-dashboard'},
    {slug: 'order',     name: '订单',     role: 'shop_manager', icon_style: 'fa fa-lg fa-credit-card'},
    {slug: 'product',   name: '商品',     role: 'shop_manager', icon_style: 'fa fa-lg fa-shopping-cart'},
    {slug: 'post',      name: '文章',     role: 'author',       icon_style: 'fa fa-lg fa-book'},
    {slug: 'topic',     name: '专题',     role: 'editor',       icon_style: 'fa fa-lg fa-circle-o'},
    {slug: 'page',      name: '页面',     role: 'editor',       icon_style: 'fa fa-lg fa-circle-o'},
    {slug: 'social',    name: '社交',     role: 'editor',       icon_style: 'fa fa-lg fa-wechat'},
    {slug: 'email',     name: '邮件',     role: 'editor',       icon_style: 'fa fa-lg fa-envelope'},
    {slug: 'attachment',name: '媒体库',   role: 'author',       icon_style: 'fa fa-lg fa-image'},
    {slug: 'cs',        name: '客服',     role: 'shop_manager', icon_style: 'fa fa-lg fa-circle-o'},
    {slug: 'user',      name: '用户',     role: 'shop_manager', icon_style: 'fa fa-lg fa-users'},
    {slug: 'affiliate', name: '联盟',     role: 'shop_manager', icon_style: 'fa fa-lg fa-signal'},
    {slug: 'analysis',  name: '数据分析',  role: 'shop_manager', icon_style: 'fa fa-lg fa-bar-chart'},
    {slug: 'setting',   name: '设置',     role: 'administrator',    icon_style: 'fa fa-lg fa-wrench'},
    {slug: 'migration', name: '数据移植',  role: 'super_user',    icon_style: 'fa fa-lg fa-database'}
];

/* Sidebar menus used by global bangli network */
const BANGLI_UK_SIDEBAR_MENUS = [
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

export const SIDEBAR_MENUS = {
    huluwa_uk: HULUWA_UK_SIDEBAR_MENUS,
    bangli_uk: BANGLI_UK_SIDEBAR_MENUS
};

/* customized menus on sidebar/topbar */
export class Menu {
    constructor(public slug: string,
                public name: string,
                public url?: string,
                public sort?: number,
                public icon_style?: string,
                public style?: string) {}
}
