/**
 * This file defines revision for post, product, newsletters, etc.
 */

export class Revision {
    id: number;
    state: string; // 'draft', 'pending', 'publish'
    content_type: string; // 'post', 'page', 'topic', 'product', 'newsletter'
    content_id: number;  // corresponding entity id
    user_id: number;     // who submits the change
    content: number;
    created_at: string;
}