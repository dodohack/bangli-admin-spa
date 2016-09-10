import { Statistic }from './statistic';
import { Activity } from './activity';
import { Revision } from './revision';
import { Category } from './category';
import { Tag }      from './tag';
import { Topic }    from './topic';
import { Brand }    from './brand';

/* PRODUCT_STATES definition, all possible entries of column products.status */
export const PRODUCT_STATES = [
    {state: 'unsaved',  count: 0}, // Initial state for offline display
    {state: 'publish',  count: 0},
    {state: 'featured', count: 0},
    {state: 'pending',  count: 0},
    {state: 'draft',    count: 0},
    {state: 'trash',    count: 0}
];

export class ProductState {
    /* The state name */
    state: string;
    /* Number of product in current status */
    count: number;
}

// API request parameters to filter list of products
export class ProductParams {
    cur_page: string = '1';
    state: string;
    editor: string;
    brand: string;
    category: string;
    datetype: string;
    datefrom: string;
    dateto: string;
    query: string;

    // Form a API query string
    toQueryString(): string {
        let s = '?page=' + this.cur_page;
        if (this.state) s = s + '&state=' + this.state;
        if (this.editor) s = s + '&editor=' + this.editor;
        if (this.brand) s = s + '&brand=' + this.brand;
        if (this.category) s = s + '&category=' + this.category;
        if (this.datetype) s = s + '&datetype=' + this.datetype;
        if (this.datefrom) s = s + '&datefrom=' + this.datefrom;
        if (this.dateto) s = s + '&dateto=' + this.dateto;
        if (this.query) s = s + '&query=' + this.query;
        return s;
    }
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
    state: string;
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

    brands: Brand[];
    categories: Category[];
    tags: Tag[];
    topics: Topic[];
    revisions: Revision[];
    statistics: Statistic[];
    activities: Activity[]; // Only have edit_lock currrently
}
