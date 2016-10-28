/**
 * A post/product/page/order etc entity model
 */

import { GeoLocation } from './location';
import { Channel }  from  './channel';
import { Statistic }from './statistic';
import { Activity } from './activity';
import { Revision } from './revision';
import { Category } from './category';
import { Tag }      from './tag';
import { Topic }    from './topic';
import { Brand }    from "./brand";
import { User }     from './user';

/**
 * Entity type constants
 */
export const ENTITY = {
    // These entities are managed by single entity reducer/effects.
    INVALID:   'invalid',
    CMS_POST:  'cms-post',
    CMS_TOPIC: 'cms-topic',
    CMS_PAGE:  'cms-page',
    CMS_DEAL:  'cms-deal',
    ADVERTISE: 'advertise',
    NEWSLETTER: 'newsletter',
    PLACE:      'place',     // Geolocation topic
    ATTACHMENT: 'attachment',
    COMMENT:    'comment',

    // Shop related entities
    SHOP_ORDER:   'shop-order',
    SHOP_PRODUCT: 'shop-product',
    SHOP_VOUCHER: 'shop-voucher',

    // Following entities are not managed by unified entity reducer/effects.
    USER: 'user'
};

/**
 * Name, reducer selector and url for ENTITY
 */
export const ENTITY_INFO = {
    'cms-post':      {selector: 'posts',      name: '文章',     slug: 'post'},
    'cms-topic':     {selector: 'topics',     name: '专题',     slug: 'topic'},
    'cms-page':      {selector: 'pages',      name: '页面',     slug: 'page'},
    'cms-deal':      {selector: 'deals',      name: '优惠',     slug: 'deal'},
    'advertise':     {selector: 'advertises', name: '广告',     slug: 'ads'},
    'shop-order':    {selector: 'orders',     name: '订单',     slug: 'order'},
    'shop-product':  {selector: 'products',    name: '商品',     slug: 'product'},
    'shop-voucher':  {selector: 'vouchers',    name: '优惠券',   slug: 'voucher'},
    'newsletter':    {selector: 'newsletters', name: '订阅邮件',  slug: 'newsletter'},
    'attachment':    {selector: 'attachments', name: '附件',     slug: 'attachment'},
    'comment':       {selector: 'comments',    name: '用户评论',  slug: 'comment'},
    'user':          {selector: 'user',        name: '用户',     slug: 'user'},
};

/**
 * CMS post:
 * CREATIVE_TYPES definition
 */
export const CREATIVE_TYPES = [
    {creative_type: 'creative',      count: 0}, // 原创
    {creative_type: 'semi_creative', count: 0}, // 伪原创
    {creative_type: 'integration',   count: 0}, // 资料整理
    {creative_type: 'review',        count: 0}  // 审稿
];

export const TOPIC_TYPES = [
    {type: 'brand',      count: 0}, // 品牌
    {type: 'website',    count: 0}, // 网站
    {type: 'products',   count: 0}, // 产品系列
    {type: 'product',    count: 0},  // 产品
    {type: 'general',    count: 0},  // 其他

    {type: 'place',      count: 0},  // 目的地
    {type: 'route',      count: 0},  // 线路
];

/** ALL:
 *  entity states, corresponding to each entity table column: state */
export const ENTITY_STATES = [
    {state: 'unsaved',  count: 0}, // Initial state for offline display
    {state: 'publish',  count: 0},
    {state: 'featured', count: 0},
    {state: 'pending',  count: 0},
    {state: 'draft',    count: 0},
    {state: 'trash',    count: 0}
];

/*
export class CreativeType {
    creative_type: string;
    count: number;
}
*/

// Cms topic types, scope per channel
export class TopicType {
    id: number;
    channel_id: number;
    slug: string;
    name: string;
    description: string;
}

export class EntityState {
    state: string;
    count: number;
}

/**
 * ALL:
 * API request parameters
 */
export class EntityParams {
    cur_page: number = 1;
    channel: string;     // CMS and DEAL only
    state: string;
    author: string;     // CMS post only
    editor: string;
    brand: string;      // Shop product only
    category: string;
    datetype: string;
    datefrom: string;
    dateto: string;
    query: string;

    // Create a API query string
    toQueryString(): string {
        let s = '?page=' + this.cur_page;
        if (this.channel) s= s+ '&channel=' + this.channel;
        if (this.state) s = s + '&state=' + this.state;
        if (this.author) s = s + '&author=' + this.author;
        if (this.editor) s = s + '&editor=' + this.editor;
        if (this.brand) s = s + '&brand=' + this.brand;
        if (this.category) s = s + '&category=' + this.category;
        if (this.datetype) s = s + '&datetype=' + this.datetype;
        if (this.datefrom) s = s + '&datefrom=' + this.datefrom;
        if (this.dateto) s = s + '&dateto=' + this.dateto;
        if (this.query) s = s + '&query=' + this.query;
        return s;
    }
}

/**
 * Shop product only:
 * Product variation
 */
    /*
export class ProductVariation {
    id: number;
    image_id: number;   // Product variation specified image
    parent_id: number;  // Base product id
    backorder: boolean; // Allow backorder when out of stock
    RSP: number;        // Retail Suggested Price
    cost: number;
    spec: string;
    price: number;
    width: number;
    height: number;
    length: number;
    sale_from: string; // Date of the begin of sale
    sale_to: string; // Date of the end of sale
    sale_price: number;
    warehouse: string;
    real_sale: number;
    real_stock: number;
    virtual_sale: number;
    virtual_stock: number;
    gross_weight: number;
}
*/

export class Entity {
    id: number;
    guid: string;
    author: User;
    editor: User;
    editor_id: number;
    author_id: number;     // CMS post only
    image_id: number;
    images: any;           // image urls
    type_id: number;       // CMS topic only: Topic type id
    type: string;          // table.type entry for some entities
    state: string;
    channel_id: number;    // CMS and DEAL only
    channel: Channel;      //
    location_id: number;   // ...
    location: GeoLocation; // CMS geolocation
    creative_type: string; // ...
    title: string;
    categories: Category[];
    tags: Tag[];           //
    topics: Topic[];       // CMS post only
    excerpt: string;
    keywords: string;      // CMS topic keywords
    desc: string;          // CMS topic description
    intro: string;         // CMS topic introduction
    content: string;
    note: string;          // CMS post and shop product only
    fake_published_at: string;
    published_at: string;
    started_at: string;    // Advertise only
    ended_at: string;      // Advertise only
    created_at: string;
    updated_at: string;
    revisions: Revision[];
    statistics: Statistic[]; // FIXME: should be statistic: Statistic;
    activities: Activity[]; // Only have edit_lock currently

    anchor_text: string;   // CMS topic only
    website: string;       // CMS topic only
    aff_url: string;       // CMS topic only
    has_deal: boolean;     // CMS topic only, if we have a corresponding deal topic
    deal_intro: string;    // CMS deal topic only
    deal_content: string;  // CMS deal topic only

    sku: string;           // Shop product only
    made_in: string;       // ...
    min_age: number;       // ...
    max_age: number;       // ...
    bbd: string;           // ...: best before date
    //variations: ProductVariation[]; // ...

    brands: Brand[];

    /* This is a fix to froala editor when creating a new post, post.content
     * should be immediate avaiable to it */
    //constructor() {
    //    this.content = '';
    //}
}