export class ProductStatus {
    /* Number of product in current status */
    count: number;

    /* The status name */
    status: string;
}

export class Product {
    id: number;
    title: string;
    description: string;
    content: string;

    checked: boolean;
    editing: boolean;
}