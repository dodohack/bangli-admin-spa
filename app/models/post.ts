/**
 * CMS Post related model
 */

import { Statistic }from './statistic';
import { Activity } from './activity';
import { Revision } from './revision';
import { Category } from './category';
import { Tag }      from './tag';
import { Topic }    from './topic';

/* CREATIVE_TYPES definition, all possible entries of table column cms_post.post_type */
export const CREATIVE_TYPES = [
    {creative_type: 'creative',      count: 0},
    {creative_type: 'semi_creative', count: 0},
    {creative_type: 'integration',   count: 0},
    {creative_type: 'review',        count: 0}
];

/* TODO: This is massively used by bangli domain, normally 1:1 match channels */
export const POST_TYPES = [
    {post_type: 'unset',     count: 0},
    {post_type: 'product',   count: 0},
    {post_type: 'knowledge', count: 0}
];

/* POST_STATES definition, all possible entries of table column cms_post.status */
export const POST_STATES = [
    {state: 'unsaved',  count: 0}, // Initial state for offline display
    {state: 'publish',   count: 0},
    {state: 'featured', count: 0},
    {state: 'pending',  count: 0},
    {state: 'draft',    count: 0},
    {state: 'trash',    count: 0}
];

export class CreativeType {
    creative_type: string;
    count: number;
}
export class PostType {
    post_type: string;
    count: number;
}
export class PostState {
    state: string;
    count: number;
}

// API request parameters to filter list of posts
export class PostParams {
    cur_page: string = '1';
    state: string;
    author: string;
    editor: string;
    category: string;
    datetype: string;
    datefrom: string;
    dateto: string;
    query: string;
    /*
    constructor(public cur_page: string = '1',
                public state: string = 'all',
                public author?: string,
                public editor?: string,
                public category?: string,
                public datefrom?: string,
                public dateto?: string,
                public query?: string) {}
    */
    // Form a API query string
    toQueryString(): string {
        let s = '?page=' + this.cur_page;
        if (this.state) s = s + '&state=' + this.state;
        if (this.author) s = s + '&author=' + this.author;
        if (this.editor) s = s + '&editor=' + this.editor;
        if (this.category) s = s + '&category=' + this.category;
        if (this.datetype) s = s + '&datetype=' + this.datetype;
        if (this.datefrom) s = s + '&datefrom=' + this.datefrom;
        if (this.dateto) s = s + '&dateto=' + this.dateto;
        if (this.query) s = s + '&query=' + this.query;
        return s;
    }
}

export class Post {
    id: number;
    editor_id: number;
    author_id: number;
    image_id: number;
    state: string;
    post_type: string;
    creative_type: string;
    title: string;
    categories: Category[];
    tags: Tag[];
    topics: Topic[];
    excerpt: string;
    content: string;
    internal_note: string;
    fake_published_at: string;
    published_at: string;
    created_at: string;
    updated_at: string;
    revisions: Revision[];
    statistics: Statistic[];
    activities: Activity[]; // Only have edit_lock currently

    /* This is a fix to froala editor when creating a new post, post.content
     * should be immediate avaiable to it */
    //constructor() {
    //    this.content = '';
    //}
}