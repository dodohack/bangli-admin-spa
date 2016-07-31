/**
 *
 */

import { Category } from './category';
import { Tag }      from './tag';
import { Topic }    from './topic';

/* POST_TYPE is used in display a list of select */
export const POST_TYPE = [
    {key: 'creative',      name: '原创'},
    {key: 'semi_creative', name: '伪原创'},
    {key: 'integration',   name: '整理'},
    {key: 'review',        name: '审稿'}
];
/* POST_TYPE_TRANS is used as a dictionary to display user friendly name */
export const POST_TYPE_TRANS = {
    creative:      '原创',
    semi_creative: '伪原创',
    integration:   '整理',
    review:        '审稿'
};

export const POST_STATUS = [
    {key: 'publish',  name: '已发布'},
    {key: 'featured', name: '置顶'},
    {key: 'pending',  name: '待审'},
    {key: 'draft',    name: '草稿'},
    {key: 'trash',    name: '回收站'}
];
export const POST_STATUS_TRANS = {
    publish:  '已发布',
    featured: '置顶',
    pending:  '待审',
    draft:    '草稿',
    trash:    '回收站'
};

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