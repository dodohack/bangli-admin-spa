/**
 * CMS Post related model
 */

import { Category } from './category';
import { Tag }      from './tag';
import { Topic }    from './topic';

/* POST_TYPES definition, all possible entries of table column cms_post.post_type */
export const POST_TYPES = ['creative', 'semi_creative', 'integration', 'review'];

/* POST_STATUSES definition, all possible entries of table column cms_post.status */
export const POST_STATUSES = ['public', 'featured', 'pending', 'draft', 'trash'];

export class PostStatus {
    /* Number of post in current status */
    count: number;

    /* The status name */
    status: string;
}

export class Post {
    id: number;
    editor_id: number;
    author_id: number;
    image_id: number;
    status: string;
    post_type: string;
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
}