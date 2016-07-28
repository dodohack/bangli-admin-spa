/**
 * This is the definition of a common category structure
 */

export class Category {
    id: number;
    parent_id: number;
    slug: string;
    name: string;
    description: string;

    hidden: boolean;
    checked: boolean;
    children: Category[];
}
