/**
 * Order statuses and number of orders per status
 */

const OrderStatusTranslation = {
    cancelled:  '已取消',
    completed:  '已完成',
    pending:    '待付款',
    processing: '处理中',
    refunded:   '已退款',
    trash:      '回收站'
};

export class OrderStatus {
    /* Number of orders in current status */
    count: number;

    /* The status name */
    status: string;
}

export class Order {
    id: number;
    title: string;
}
