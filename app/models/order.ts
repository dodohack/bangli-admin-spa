/**
 * Order statuses and number of orders per status
 */

export const ORDER_STATUSES = [
    'pending',
    'processing',
    'shipped',
    'completed',
    'cancelled',
    'refunded',
    'failed',
    'trash'
];

export const CARRIERS = [ 'BP', 'PF' ];

export class OrderStatus {
    /* Number of orders in current status */
    count: number;

    /* The status name */
    status: string;
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
    status: string;
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
