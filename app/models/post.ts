/**
 *
 */

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
    title: string;
    description: string;
    content: string;
}