/**
 * This is the definition of a common category structure
 */

export class Category {
    id: number;
    parent_id: number;
    channel_id: number;
    slug: string;
    name: string;
    text: string;    // The same as 'name', used by ng2-select.
    description: string;

    //level: number; // tree nested levels started from 0, used in display
    checked: boolean;
}
