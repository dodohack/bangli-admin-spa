/**
 * Shop order reducer
 */
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action }     from '@ngrx/store';

import { Paginator }    from '../models';
import { Order }        from '../models';
import { OrderActions } from '../actions';

export interface OrdersState {
    ids: number[];
    entities: { [id: number]: Order };
    paginator: Paginator;
};

const initialState: OrdersState = {
    ids: [],
    entities: {},
    paginator: new Paginator
};

export default function (state = initialState, action: Action): OrdersState {
    switch (action.type)
    {
        case OrderActions.SEARCH_COMPLETE:
        case OrderActions.LOAD_ORDERS_SUCCESS: {
            const orders: Order[] = action.payload.orders;
            const ids: number[]   = orders.map(o => o.id);
            const entities        = orders.reduce(
                (entities: { [id: number]: Order }, order: Order) => {
                    order.selected = false;
                    return Object.assign(entities, { [order.id]: order });
                }, {});

            return {
                ids: [...ids],
                entities: Object.assign({}, entities),
                paginator: Object.assign({}, action.payload.paginator)
            };
        }

        default:
            return state;
    }
}

/**
 * Return a order for given id from current order list
 */
export function getOrder(id: number) {
    return (state$: Observable<OrdersState>) =>
        state$.select(o => o.entities[id]);
}
