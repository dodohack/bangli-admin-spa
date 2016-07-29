/**
 * This is the definition of topic model
 */

export class Topic {
    id: number;
    editor_id: number;
    status: string;
    guid: string;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;

    hidden: boolean;
    checked: boolean;
}
