/**
 * This is the definition of a common tag model
 */

export interface Tag {
    id: number;
    channel_id: number;
    slug: string;
    name: string;
    description: string;
}
