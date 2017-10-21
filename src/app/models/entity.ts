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
    'advertise':     {selector: 'advertises', name: '广告',     slug: 'advertise'},
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
export const TOPIC_RANKINGS = [ 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50 ];

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
export interface TopicType {
    id: number;
    channel_id: number;
    text: string; // Same as name, for ng2-select only
    slug: string;
    name: string;
    description: string;
}

export interface EntityStatus {
    status: string;
    count: number;
}

/**
 * ALL:
 * API request parameters
 */
export interface EntityParams {
    page: number;
    channel?: string;
    status?: string;
    author?: string;
    editor?: string;
    brand?: string;
    category?: string;
    topic?: string;
    datetype?: string ;
    datefrom?: string;
    dateto?: string;
    query?: string;
}


export interface Entity {
    id: number;
    guid?: string;
    author?: User;
    editor?: User;
    editor_id?: number;
    author_id?: number;     // CMS post only
    image_id?: number;
    images?: any;           // image urls
    image_url?: string;     // single image url
    type_id?: number;       // CMS topic only: Topic type id
    type?: TopicType;       // table.type entry for some entities
    status?: string;
    channel_id?: number;    // CMS and DEAL only
    channel?: Channel;      //
    location_id?: number;   // ...
    location?: GeoLocation; // CMS geolocation
    title?: string;
    title_cn?: string;
    categories?: Category[];
    tags?: Tag[];           //
    topics?: Topic[];       // CMS post only
    excerpt?: string;
    keywords?: string;      // CMS topic keywords seperated by ','.
    description?: string;   // CMS topic description
    intro?: string;         // CMS topic introduction
    content?: string;
    published_at?: string;
    starts?: string;        // Advertise/Offer only
    ends?: string;          // Advertise/Offer only
    created_at?: string;
    updated_at?: string;
    revisions?: Revision[];
    statistics?: Statistic[]; // FIXME: should be statistic: Statistic;
    activities?: Activity[];  // Only have edit_lock currently

    display_url?: string;     // CMS topic only
    tracking_url?: string;    // CMS topic only
    offers_count?: number;    // CMS topic only

    brands?: Brand[];

    path?: string;            // Attachment only
    filename?: string;        // Attachment only

    /* This is a fix to froala editor when creating a new post, post.content
     * should be immediate avaiable to it */
    //constructor() {
    //    this.content = '';
    //}
}