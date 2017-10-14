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
export interface TopicParams {
    page: string;
    channel?: string;
    status?: string;
    editor?: string;
    category?: string;
    datetype?: string;
    datefrom?: string;
    dateto?: string;
    query?: string;
}

/**
 * This is the topic model used as relationship to the main entity we editing.
 */
export interface Topic {
    id: number;
    hide?: boolean; // Only used by filtering
    editor_id?: number;
    channel_id?: number;
    type_id?: number;
    locations?: GeoLocation[];
    status?: string;
    guid?: string;
    title?: string;
    tags?: Tag[];
    categories?: Category[];
    posts?: Post[];
    content?: string;
    created_at?: string;
    updated_at?: string;
    revisions?: Revision[];
    statistics?: Statistic[];
    activities?: Activity[];
}
