/*
 * Sidebar menus definition for all websites
 */
import { Domain } from '../domain';

/* Sidebar menus used by huluwa management */
const HULUWA_UK_SIDEBAR_MENUS = [
    {slug: 'dashboard', name: '控制面板',   icon_style: 'fa fa-lg fa-dashboard'},
    {slug: 'order',     name: '订单',      icon_style: 'fa fa-lg fa-credit-card'},
    {slug: 'product',   name: '商品',      icon_style: 'fa fa-lg fa-shopping-cart'},
    {slug: 'post',      name: '文章',      icon_style: 'fa fa-lg fa-book'},
    {slug: 'topic',     name: '专题',      icon_style: 'fa fa-lg fa-circle-o'},
    {slug: 'page',      name: '页面',      icon_style: 'fa fa-lg fa-circle-o'},
    {slug: 'wechat',    name: '微信',      icon_style: 'fa fa-lg fa-wechat'},
    {slug: 'email',     name: '邮件',      icon_style: 'fa fa-lg fa-envelope'},
    {slug: 'gallery',   name: '媒体库',    icon_style: 'fa fa-lg fa-image'},
    {slug: 'cs',        name: '客服',      icon_style: 'fa fa-lg fa-circle-o'},
    {slug: 'comment',   name: '评论',      icon_style: 'fa fa-lg fa-circle-o'},
    {slug: 'user',      name: '用户',      icon_style: 'fa fa-lg fa-users'},
    {slug: 'affiliate', name: '联盟',      icon_style: 'fa fa-lg fa-signal'},
    {slug: 'seo',       name: 'SEO',      icon_style: 'fa fa-lg fa-circle-o'},
    {slug: 'analysis',  name: '数据分析',   icon_style: 'fa fa-lg fa-bar-chart'},
    {slug: 'setting',   name: '设置',      icon_style: 'fa fa-lg fa-wrench'},
    {slug: 'migration', name: '数据移植',   icon_style: 'fa fa-lg fa-database'}
];

/* Sidebar menus used by global bangli network */
const BANGLI_UK_SIDEBAR_MENUS = [
    {slug: 'dashboard', name: '控制面板',   icon_style: 'fa fa-lg fa-dashboard'},
    {slug: 'post',      name: '文章',      icon_style: 'fa fa-lg fa-book'},
    {slug: 'topic',     name: '专题',      icon_style: 'fa fa-lg fa-circle-o'},
    {slug: 'page',      name: '页面',      icon_style: 'fa fa-lg fa-circle-o'},
    {slug: 'wechat',    name: '微信',      icon_style: 'fa fa-lg fa-wechat'},
    {slug: 'email',     name: '邮件',      icon_style: 'fa fa-lg fa-envelope'},
    {slug: 'gallery',   name: '媒体库',    icon_style: 'fa fa-lg fa-image'},
    {slug: 'comment',   name: '评论',      icon_style: 'fa fa-lg fa-circle-o'},
    {slug: 'user',      name: '用户',      icon_style: 'fa fa-lg fa-users'},
    {slug: 'seo',       name: 'SEO',      icon_style: 'fa fa-lg fa-circle-o'},
    {slug: 'analysis',  name: '数据分析',   icon_style: 'fa fa-lg fa-bar-chart'},
    {slug: 'setting',   name: '设置',      icon_style: 'fa fa-lg fa-wrench'},
    {slug: 'migration', name: '数据移植',   icon_style: 'fa fa-lg fa-database'}
];

const SIDEBAR_MENUS = {
    huluwa_uk: HULUWA_UK_SIDEBAR_MENUS,
    bangli_uk: BANGLI_UK_SIDEBAR_MENUS
};

export class Sidebar {

    /**
     * Return corresponding sidebar menu for current managed website
     * Bangli network has the same sidebar menu.
     * @returns {any}
     */
    public static getMenu() {
        let key = Domain.getKey();
        if (key == 'huluwa_uk')
            return SIDEBAR_MENUS[key];
        else
            return SIDEBAR_MENUS['bangli_uk'];
    }
} 

/* customized menus on sidebar/topbar */
export class Menu {
    constructor(public slug: string,
                public name: string,
                public url?: string,
                public sort?: number,
                public icon_style?: string,
                public style?: string) {}
}
