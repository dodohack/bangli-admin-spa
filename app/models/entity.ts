/**
 * A post/product/page/order etc entity model
 */

import { Location } from './location';
import { Channel }  from  './channel';
import { Statistic }from './statistic';
import { Activity } from './activity';
import { Revision } from './revision';
import { Category } from './category';
import { Tag }      from './tag';
import { Topic }    from './topic';
import { Brand }    from "./brand";

/**
 * Entity type constants, used by effects and others
 */
export const ENTITY_TYPE = [
    
];

/**
 * CMS post:
 * CREATIVE_TYPES definition
 */
/*
export const CREATIVE_TYPES = [
    {creative_type: 'creative',      count: 0}, // 原创
    {creative_type: 'semi_creative', count: 0}, // 伪原创
    {creative_type: 'integration',   count: 0}, // 资料整理
    {creative_type: 'review',        count: 0}  // 审稿
];
*/

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

export class EntityState {
    state: string;
    count: number;
}

/**
 * ALL:
 * API request parameters
 */
export class EntityParams {
    cur_page: string = '1';
    channel: string  = 'all'; // CMS and DEAL only
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
    editor_id: number;
    author_id: number;     // CMS post only
    image_id: number;
    images: any;           // image urls
    type: number;          // table.type entry for some entities
    state: string;
    channel_id: number;    // CMS and DEAL only
    channels: Channel[];   // ...
    location_id: number;   // ...
    locations: Location[]; // ...
    creative_type: string; // ...
    title: string;
    categories: Category[];
    tags: Tag[];
    topics: Topic[];
    excerpt: string;
    content: string;
    note: string;          // CMS post and shop product only
    fake_published_at: string;
    published_at: string;
    created_at: string;
    updated_at: string;
    revisions: Revision[];
    statistics: Statistic[];
    activities: Activity[]; // Only have edit_lock currently

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