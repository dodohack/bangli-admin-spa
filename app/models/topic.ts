/**
 * This is the definition of topic model
 */

import { Category } from "./category";
import { Location } from './location';

// API request parameters to filter list of topics
export class TopicParams {
    cur_page: string = '1';
    state: string;
    editor: string;
    category: string;
    datetype: string;
    datefrom: string;
    dateto: string;
    query: string;
    /*
     constructor(public cur_page: string = '1',
     public state: string = 'all',
     public editor?: string,
     public category?: string,
     public datefrom?: string,
     public dateto?: string,
     public query?: string) {}
     */
    // Form a API query string
    toQueryString(): string {
        let s = '?page=' + this.cur_page;
        if (this.state) s = s + '&state=' + this.state;
        if (this.editor) s = s + '&editor=' + this.editor;
        if (this.category) s = s + '&category=' + this.category;
        if (this.datetype) s = s + '&datetype=' + this.datetype;
        if (this.datefrom) s = s + '&datefrom=' + this.datefrom;
        if (this.dateto) s = s + '&dateto=' + this.dateto;
        if (this.query) s = s + '&query=' + this.query;
        return s;
    }
}

export class Topic {
    id: number;
    hide: boolean; // Only used by filtering
    editor_id: number;
    channel_id: number;
    locations: Location[];
    state: string;
    guid: string;
    title: string;
    categories: Category[];
    content: string;
    created_at: string;
    updated_at: string;
}
