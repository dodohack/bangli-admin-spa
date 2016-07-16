/**
 * This is the definition of post_type translation from key to readable text.
 * This kind of post_type is relative to editor, not author, as it is always
 * 'creative' post_type for author.
 */

export class PostType {
    public creative = '原创';
    public semi_creative = '伪原创';
    public integration = '整理';
    public review = '审稿';
}