/**
 * Order statuses and number of orders per status
 */

export const ORDER_STATES = [
    {state: 'pending',    count: 0},
    {state: 'processing', count: 0},
    {state: 'shipped',    count: 0},
    {state: 'completed',  count: 0},
    {state: 'cancelled',  count: 0},
    {state: 'refunded',   count: 0},
    {state: 'failed',     count: 0},
    {state: 'trash',      count: 0}
];

export const CARRIERS = [ 'BP', 'PF' ];

export class OrderState {
    /* The state name */
    state: string;
    
    /* Number of orders in current state */
    count: number;
}


// API request parameters to filter list of orders
export class OrderParams {
    cur_page: string = '1';
    state: string;
    datetype: string;
    datefrom: string;
    dateto: string;
    query: string;

    // Form a API query string
    toQueryString(): string {
        let s = '?page=' + this.cur_page;
        if (this.state) s = s + '&state=' + this.state;
        if (this.datetype) s = s + '&datetype=' + this.datetype;
        if (this.datefrom) s = s + '&datefrom=' + this.datefrom;
        if (this.dateto) s = s + '&dateto=' + this.dateto;
        if (this.query) s = s + '&query=' + this.query;
        return s;
    }
}


export class Shipping {
    country: string;
    province: string;
    city: string;
    county: string;
    address: string;
    name: string;  // receipt name
    email: string;
    phone: string;
    carrier: string; // PF: parcel force, BP: bpost etc
    postage_currency: string;
    postage: number; // User paid postage
    cost_currency: string;
    cost: number;    // Cost of postage
    tracking: string; // Tracking number
}

export class Billing {
    // Not supported yet.
}

export class OrderItem {
    id: number;
    qty: number;
    sku: string;
    cost: number;
    price: number;
    spec: string;
    title: string;
    image_id: number;
    warehouse: string;
    cost_currency: string;
    price_currency: string;
}

export class OrderHistory {
    date: string;
    user: string;
    action: string;
    content: string;
}

export class Order {
    id: number;
    user_id: number;
    state: string;
    user_ip: string;
    user_agent: string;
    currency: string;
    total: number;
    charge: number;
    discount: number;
    voucher: string;
    gateway: string;
    transaction_id: string;
    serial_id: string;
    paid_at: string;
    shippings: Shipping[];
    billing: Billing;
    products: OrderItem[];
    update_history: OrderHistory[];
    created_at: string;
    updated_at: string;
}
