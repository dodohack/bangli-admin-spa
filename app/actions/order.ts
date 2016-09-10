import { Action }      from '@ngrx/store';
import { Order }       from '../models';
import { OrderParams } from '../models';

export class OrderActions {
    static SEARCH = '[Order] Search';
    static search(params: OrderParams): Action {
        return {
            type: OrderActions.SEARCH,
            payload: params
        };
    }

    static SEARCH_COMPLETE = '[Order] Search Complete';
    static searchComplete(results: Order[]): Action {
        return {
            type: OrderActions.SEARCH_COMPLETE,
            payload: results
        };
    }

    static LOAD_ORDERS = '[Order] Load Orders';
    static loadOrders(params: OrderParams): Action {
        return {
            type: OrderActions.LOAD_ORDERS,
            payload: params
        };
    }

    static LOAD_ORDERS_SUCCESS = '[Order] Load Orders Success';
    static loadOrdersSuccess(orders: Order[]): Action {
        return {
            type: OrderActions.LOAD_ORDERS_SUCCESS,
            payload: orders
        };
    }

    static LOAD_ORDERS_FAIL = '[Order] Load Products Fail';
    static loadOrdersFail(): Action {
        return {
            type: OrderActions.LOAD_ORDERS_FAIL,
        };
    }


    static BATCH_EDIT_ORDERS = '[Order] Batch Edit Orders';
    static batchEditOrders(ids: number[]): Action {
        return {
            type: OrderActions.BATCH_EDIT_ORDERS,
            payload: ids
        };
    }

    static CANCEL_BATCH_EDIT_ORDERS = '[Order] Cancel Batch Edit Orders';
    static cancelBatchEditOrders(): Action {
        return {
            type: OrderActions.CANCEL_BATCH_EDIT_ORDERS
        };
    }

    static BATCH_DELETE_ORDERS = '[Order] Batch Delete Orders';
    static batchDeleteOrders(ids: number[]): Action {
        return {
            type: OrderActions.BATCH_DELETE_ORDERS,
            payload: ids
        };
    }

    static BATCH_EDIT_PREVIOUS_ORDER = '[Order] Batch Edit Previous Order';
    static batchEditPreviousOrder(): Action {
        return {
            type: OrderActions.BATCH_EDIT_PREVIOUS_ORDER
        };
    }

    static BATCH_EDIT_NEXT_ORDER = '[Order] Batch Edit Next Order';
    static batchEditNextOrder(): Action {
        return {
            type: OrderActions.BATCH_EDIT_NEXT_ORDER
        };
    }

    static NEW_ORDER = '[Order] New Order';
    static newOrder(): Action {
        return {
            type: OrderActions.NEW_ORDER
        };
    }

    static LOAD_ORDER = '[Order] Load Order';
    static loadOrder(id: number): Action {
        return {
            type: OrderActions.LOAD_ORDER,
            payload: id
        };
    }

    static LOAD_ORDER_SUCCESS = '[Order] Load Order Success';
    static loadOrderSuccess(order: Order): Action {
        return {
            type: OrderActions.LOAD_ORDER_SUCCESS,
            payload: order
        };
    }

    static LOAD_ORDER_FAIL = '[Order] Load Order Fail';
    static loadOrderFail(): Action {
        return {
            type: OrderActions.LOAD_ORDER_FAIL,
        };
    }

    static AUTO_SAVE = '[Order] Auto Save';
    static autoSave(order: Order): Action {
        return {
            type: OrderActions.AUTO_SAVE,
            payload: order
        };
    }

    static SAVE_ORDER = '[Order] Save Order';
    static saveOrder(order: Order): Action {
        return {
            type: OrderActions.SAVE_ORDER,
            payload: order
        };
    }

    static SAVE_ORDER_SUCCESS = '[Order] Save Order Success';
    static saveOrderSuccess(order: Order): Action {
        return {
            type: OrderActions.SAVE_ORDER_SUCCESS,
            payload: order
        };
    }

    static SAVE_ORDER_FAIL = '[Order] Save Order Fail';
    static saveOrderFail(): Action {
        return {
            type: OrderActions.SAVE_ORDER_FAIL
        };
    }

    static SAVE_ORDERS = '[Order] Save Orders';
    static saveOrders(orders: Order[]): Action {
        return {
            type: OrderActions.SAVE_ORDERS,
            payload: orders
        };
    }
}