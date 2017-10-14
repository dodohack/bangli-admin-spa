/**
 * CMS Post related model
 */

import { GeoLocation } from './location';
import { Channel }  from  './channel';
import { Statistic }from './statistic';
import { Activity } from './activity';
import { Revision } from './revision';
import { Category } from './category';
import { Tag }      from './tag';
import { Topic }    from './topic';

/* POST_STATES definition, all possible entries of table column cms_post.status */
export const POST_STATES = [
    {status: 'unsaved',  count: 0}, // Initial status for offline display
    {status: 'publish',  count: 0},
    {status: 'featured', count: 0},
    {status: 'pending',  count: 0},
    {status: 'draft',    count: 0},
    {status: 'trash',    count: 0}
];

export class CreativeType {
    creative_type: string;
    count: number;
}

export class PostState {
    status: string;
    count: number;
}

// API request parameters to filter list of posts
export interface PostParams {
    page: string;
    channel?: string;
    status?: string;
    author?: string;
    editor?: string;
    category?: string;
    datetype?: string;
    datefrom?: string;
    dateto?: string;
    query?: string;

}

export interface Post {
    id: number;
    editor_id?: number;
    author_id?: number;
    image_id?: number;
    images?: any; // image urls
    status?: string;
    channel_id?: number;
    channels?: Channel[];
    location_id?: number;
    locations?: GeoLocation[];
    creative_type?: string;
    title?: string;
    categories?: Category[];
    tags?: Tag[];
    topics?: Topic[];
    excerpt?: string;
    content?: string;
    internal_note?: string;
    fake_published_at?: string;
    published_at?: string;
    created_at?: string;
    updated_at?: string;
    revisions?: Revision[];
    statistics?: Statistic[];
    activities?: Activity[]; // Only have edit_lock currently

    /* This is a fix to froala editor when creating a new post, post.content
     * should be immediate avaiable to it */
    //constructor() {
    //    this.content = '';
    //}
}