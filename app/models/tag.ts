/**
 * This is the definition of a common tag model
 */

export class Tag {
    id: number;
    slug: string;
    name: string;
    description: string;

    hidden: boolean;
    checked: boolean;
}
