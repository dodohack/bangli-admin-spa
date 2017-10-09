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
    POST:  'post',
    TOPIC: 'topic',
    PAGE:  'page',
    OFFER:  'offer',
    ADVERTISE: 'advertise',
    NEWSLETTER: 'newsletter',
    PLACE:      'place',     // Geolocation topic
    ATTACHMENT: 'attachment',
    COMMENT:    'comment',

    // Following entities are not managed by unified entity reducer/effects.
    USER: 'user'
};

/**
 * Name, reducer selector and url for ENTITY
 */
export const ENTITY_INFO = {
    'post':      {selector: 'posts',      name: '文章',     slug: 'post'},
    'topic':     {selector: 'topics',     name: '专题',     slug: 'topic'},
    'page':      {selector: 'pages',      name: '页面',     slug: 'page'},
    'offer':     {selector: 'offers',     name: '优惠',     slug: 'offer'},
    'advertise':     {selector: 'advertises', name: '广告',     slug: 'ads'},
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

/**
 * Topic display ranking
 */
export const TOPIC_RANKINGS = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

/** ALL:
 *  entity status, corresponding to each entity table column: status */
export const ENTITY_STATES = [
    'unsaved',
    'publish',
    'featured',
    'pending',
    'draft',
    'trash',
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
    text: string; // Same as name, for ng2-select only
    slug: string;
    name: string;
    description: string;
}

export class EntityStatus {
    status: string;
    count: number;
}

/**
 * ALL:
 * API request parameters
 */
export class EntityParams {

    constructor(public cur_page: number = 1,
                public channel: string = null,
                public status: string = null,
                public author: string = null,
                public editor: string = null,
                public brand: string = null,
                public category: string = null,
                public topic: string = null,
                public datetype: string = null,
                public datefrom: string = null,
                public dateto: string = null,
                public query: string = null) {}

    // NOTE: If we create an empty object and assign the properties of the
    // the object individual, we get a error "can't assign to read only object".
    /*
    cur_page: number = 1;
    channel: string;     // CMS and DEAL only
    status: string;
    author: string;     // CMS post only
    editor: string;
    brand: string;      // Shop product only
    category: string;
    datetype: string;
    datefrom: string;
    dateto: string;
    query: string;
    */

    // Create a API query string
    toQueryString(): string {
        let s = '?page=' + this.cur_page;
        if (this.channel) s= s+ '&channel=' + this.channel;
        if (this.status) s = s + '&status=' + this.status;
        if (this.author) s = s + '&author=' + this.author;
        if (this.editor) s = s + '&editor=' + this.editor;
        if (this.brand) s = s + '&brand=' + this.brand;
        if (this.category) s = s + '&category=' + this.category;
        if (this.topic) s = s + '&topic=' + this.topic;
        if (this.datetype) s = s + '&datetype=' + this.datetype;
        if (this.datefrom) s = s + '&datefrom=' + this.datefrom;
        if (this.dateto) s = s + '&dateto=' + this.dateto;
        if (this.query) s = s + '&query=' + this.query;
        return s;
    }
}


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
    type: TopicType;       // table.type entry for some entities
    status: string;
    channel_id: number;    // CMS and DEAL only
    channel: Channel;      //
    location_id: number;   // ...
    location: GeoLocation; // CMS geolocation
    title: string;
    title_cn: string;
    categories: Category[];
    tags: Tag[];           //
    topics: Topic[];       // CMS post only
    excerpt: string;
    keywords: string;      // CMS topic keywords seperated by ','.
    description: string;   // CMS topic description
    intro: string;         // CMS topic introduction
    content: string;
    published_at: string;
    started_at: string;    // Advertise only
    ended_at: string;      // Advertise only
    created_at: string;
    updated_at: string;
    revisions: Revision[];
    statistics: Statistic[]; // FIXME: should be statistic: Statistic;
    activities: Activity[];  // Only have edit_lock currently

    display_url: string;     // CMS topic only
    tracking_url: string;    // CMS topic only
    offers_count: number;    // CMS topic only

    brands: Brand[];

    /* This is a fix to froala editor when creating a new post, post.content
     * should be immediate avaiable to it */
    //constructor() {
    //    this.content = '';
    //}
}