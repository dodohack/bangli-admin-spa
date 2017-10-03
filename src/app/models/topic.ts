/**
 * DEPRECATED ??
 * This is the definition of topic model
 */

import { Category }  from "./category";
import { Tag }       from './tag';
import { GeoLocation }  from './location';
import { Statistic } from './statistic';
import { Revision }  from './revision';
import { Activity }  from './activity';
import { Post }      from './post';

// API request parameters to filter list of topics
export class TopicParams {
    channel: string = 'all';
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
        if (this.channel) s = s + '&channel=' + this.channel;
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

/**
 * This is the topic model used as relationship to the main entity we editing.
 */
export class Topic {
    id: number;
    hide: boolean; // Only used by filtering
    editor_id: number;
    channel_id: number;
    type_id: number;
    locations: GeoLocation[];
    state: string;
    guid: string;
    title: string;
    tags: Tag[];
    categories: Category[];
    posts: Post[];
    content: string;
    created_at: string;
    updated_at: string;
    revisions: Revision[];
    statistics: Statistic[];
    activities: Activity[];
}