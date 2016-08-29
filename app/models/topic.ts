/**
 * This is the definition of topic model
 */

import { Category } from "./category";

/* TOPIC_TYPES is massively used by bangli domain */
export const TOPIC_TYPES = [
    {topic_type: 'product',     count: 0},
    {topic_type: 'place',       count: 0},
    {topic_type: 'university',  count: 0},
    {topic_type: 'city',        count: 0},
    {topic_type: 'brand',       count: 0}
];

export class TopicType {
    topic_type: string;
    count: number;
}

export class Topic {
    id: number;
    hide: boolean; // Only used by filtering
    editor_id: number;
    topic_type: string;
    status: string;
    guid: string;
    title: string;
    categories: Category[];
    content: string;
    created_at: string;
    updated_at: string;
}
