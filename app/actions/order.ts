import { Action }  from '@ngrx/store';
import { Order }   from '../models';

export class OrderActions {
    static SEARCH = '[Order] Search';
    static search(query: string): Action {
        return {
            type: OrderActions.SEARCH,
            payload: query
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
    static loadOrders(filters: any): Action {
        return {
            type: OrderActions.LOAD_ORDERS,
            payload: filters
        };
    }

    static LOAD_ORDERS_SUCCESS = '[Order] Load Orders Success';
    static loadOrdersSuccess(products: Order[]): Action {
        return {
            type: OrderActions.LOAD_ORDERS_SUCCESS,
            payload: products
        };
    }

    static LOAD_ORDERS_FAIL = '[Order] Load Products Fail';
    static loadOrdersFail(): Action {
        return {
            type: OrderActions.LOAD_ORDERS_FAIL,
        };
    }
}