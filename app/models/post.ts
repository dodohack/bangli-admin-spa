/**
 *
 */

import { Category } from './category';
import { Tag }      from './tag';
import { Topic }    from './topic';

export const PostTypeTranslation = {
    creative      : '原创',
    semi_creative : '伪原创',
    integration   : '整理',
    review        : '审稿'
};

export const PostStatusTranslation = {
    publish  : '发布',
    featured : '置顶',
    pending  : '待审',
    draft    : '草稿',
    trash    : '回收站'
};

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
    /* TODO: Should have a image_url as well */
    image_id: number;
    status: string;
    post_type: string;
    categories: Category[];
    tags: Tag[];
    topics: Topic[];
    title: string;
    excerpt: string;
    content: string;
    /* Frontend display use */
    fake_published_at: string;
    /* Backend management use */
    published_at: string;
    created_at: string;
    updated_at: string;

    dirtyCat: boolean;
    dirtyTag: boolean;
    dirtyTopic: boolean;
    dirtyContent: boolean;
    dirtyOthers: boolean; /* All other columns except those listed above */
}