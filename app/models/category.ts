/**
 * This is the definition of a common category structure
 */

export class Category {
    id: number;
    parent_id: number;
    channel_id: number;
    slug: string;
    name: string;
    description: string;

    //level: number; // tree nested levels started from 0, used in display
    checked: boolean;
}
