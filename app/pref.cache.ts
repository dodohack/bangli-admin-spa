/**
 * This is a temporary solution get retrieve user preference globally
 * globally, all the information is manually cached in session storage
 */

export class PrefCache {
    static getPerPage():string { return sessionStorage.getItem('list_item_count'); }
    static setPerPage(v: string) { if (v) sessionStorage.setItem('list_item_count', v); }
}
