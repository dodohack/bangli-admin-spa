import { Category } from './category';
import { Tag } from './tag';

export class ProductStatus {
    /* Number of product in current status */
    count: number;

    /* The status name */
    status: string;
}

export class ProductVariation {
    RSP: number; // Retail Suggested Price
    cost: number;
    spec: string;
    price: number;
    width: number;
    height: number;
    length: number;
    sale_from: string; // Date of the begin of sale
    sale_to: string; // Date of the end of sale
    sale_price: number;
    warehouse: string;
    real_sales: number;
    real_stock: number;
    virtual_sales: number;
    virtual_stock: number;
    gross_weight: number;
}

export class Product {
    id: number;
    editor_id: number;
    brand_id: number;
    product_type: string;
    guid: string;
    status: string;
    title: string;
    excerpt: string;
    content: string;
    sku: string;
    backorder: boolean;
    made_in: string;
    min_age: number;
    max_age: number;
    bbd: string;
    notice: string;
    variations: ProductVariation[];
    created_at: string;
    updated_at: string;

    categories: Category[];
    tags: Tag[];

    checked: boolean;
    editing: boolean;
}