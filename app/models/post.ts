/**
 * CMS Post related model
 */

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

/* TODO: This is massively used by bangli domain */
export const POST_TYPES = [
    {post_type: 'unset',     count: 0},
    {post_type: 'product',   count: 0},
    {post_type: 'knowledge', count: 0}
];

/* POST_STATES definition, all possible entries of table column cms_post.status */
export const POST_STATES = [
    {state: 'unsaved',  count: 0}, // Initial state for offline display
    {state: 'public',   count: 0},
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
};
export class PostState {
    state: string;
    count: number;
};

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
    fake_published_at: string;
    published_at: string;
    created_at: string;
    updated_at: string;

    /* This is a fix to froala editor when creating a new post, post.content
     * should be immediate avaiable to it */
    //constructor() {
    //    this.content = '';
    //}
}