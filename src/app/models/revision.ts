/**
 * This file defines revision for post, product, newsletters, etc.
 */

export class Revision {
    id: number;
    state: string; // 'draft', 'pending', 'publish'
    content_type: string; // 'cms_post', 'cms_page', 'shop_product', etc
    content_id: number;  // corresponding entity id
    user_id: number;     // who submits the change
    body: string;
    created_at: string;
}