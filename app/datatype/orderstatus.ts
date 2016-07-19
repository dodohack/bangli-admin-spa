/**
 * This is the definition of post.status translation from key to readable text.
 */

export class OrderStatus {
    public cancelled  = '已取消';
    public completed  = '已完成';
    public pending    = '待付款';
    public processing = '处理中';
    public refunded   = '已退款';
    public trash      = '回收站';
}