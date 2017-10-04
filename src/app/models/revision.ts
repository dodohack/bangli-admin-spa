/**
 * This file defines revision for post, product, newsletters, etc.
 */

export class Revision {
    id: number;
    status: string; // 'draft', 'pending', 'publish'
    content_type: string; // 'post', 'page', 'topic'
    content_id: number;  // corresponding entity id
    user_id: number;     // who submits the change
    body: string;
    created_at: string;
}