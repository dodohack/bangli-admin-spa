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

    constructor(public id: number,
                public editor_id: number,
                public author_id: number,
                public image_id: number,
                public status: string,
                public post_type: string,
                public title: string,
                public categories: Category[],
                public tags?: Tag[],
                public topics?: Topic[],
                public excerpt?: string,
                public content?: string,
                public checked?: boolean, /* Is checked in post list */
                public editing?: boolean, /* Is in fast editing mode */
                public fake_published_at?: string,
                public published_at?: string,
                public created_at?: string,
                public updated_at?: string,
                public dirtyContent?: boolean /* Is post content changed */
    ) {}


    /**
     * Abstract common part
     * @param posts
     */
    static abstractCommonPartFromPosts(posts: Post[])
    {
    }
}