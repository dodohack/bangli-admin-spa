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
    editing: number[]; // Order in editing state
    entities: { [id: number]: Order };
    paginator: Paginator;
};

const initialState: OrdersState = {
    ids: [],
    editing: [],
    entities: {},
    paginator: new Paginator
};


export default function (state = initialState, action: Action): OrdersState {
    switch (action.type)
    {
        case OrderActions.SEARCH_COMPLETE:
        case OrderActions.LOAD_ORDERS_SUCCESS: {
            const orders: Order[] = action.payload.orders;
            const ids: number[]       = orders.map(p => p.id);
            const entities            = orders.reduce(
                (entities: { [id: number]: Order }, order: Order) => {
                    return Object.assign(entities, { [order.id]: order });
                }, {});

            return {
                ids: [...ids],
                editing: [],
                entities: Object.assign({}, entities),
                paginator: Object.assign({}, action.payload.paginator)
            };
        }

        case OrderActions.BATCH_EDIT_ORDERS: {
            return {
                ids: [...state.ids],
                editing: [...action.payload],
                entities: Object.assign({}, state.entities),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case OrderActions.CANCEL_BATCH_EDIT_ORDERS: {
            return {
                ids: [...state.ids],
                editing: [],
                entities: Object.assign({}, state.entities),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case OrderActions.BATCH_EDIT_PREVIOUS_ORDER: {
            // DO NOTHING IF WE ARE NOT FAST EDITING SINGLE ORDER
            if (state.editing.length !== 1) return state;

            // Get previous order id
            let idx = state.ids.indexOf(state.editing[0]) - 1;
            if (idx < 0) idx = 0;
            const previousId = state.ids[idx];

            return {
                ids: [...state.ids],
                editing: [previousId],
                entities: Object.assign({}, state.entities),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case OrderActions.BATCH_EDIT_NEXT_ORDER: {
            // DO NOTHING IF WE ARE NOT FAST EDITING SINGLE ORDER
            if (state.editing.length !== 1) return state;

            // Get next order id
            let idx = state.ids.indexOf(state.editing[0]) + 1;
            if (idx > state.ids.length - 1) idx = state.ids.length - 1;
            const nextId = state.ids[idx];

            return {
                ids: [...state.ids],
                editing: [nextId],
                entities: Object.assign({}, state.entities),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case OrderActions.SAVE_ORDER_SUCCESS:
        case OrderActions.LOAD_ORDER_SUCCESS: {
            // Order id
            const id: number = +action.payload['id'];

            // Update corresponding order from current orders list or create a
            // new list with 1 element.
            // TODO: Remove id 0 order
            return {
                ids: (state.ids.indexOf(id) === -1) ? [...state.ids, id] : [...state.ids],
                editing: [id],
                entities: Object.assign({}, state.entities, {[id]: action.payload}),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case OrderActions.NEW_ORDER: {
            // Create a new order, we use '0' as a placeholder id
            const id = 0;
            let newOrder: Order  = new Order;
            newOrder.state      = 'unsaved';

            return {
                ids: [...state.ids, id],
                editing: [id],
                entities: Object.assign({}, state.entities, {[id]: newOrder}),
                paginator: Object.assign({}, state.paginator)
            };
        }

        /* This is a must, as we can get the updated order from its subscriber */
        /*
         case OrderActions.SAVE_ORDER: {
         const id: number = +action.payload['id'];

         return {
         ids: [...state.ids],
         editing: [...state.editing],
         entities: Object.assign({}, state.entities, {[id]: action.payload}),
         paginator: Object.assign({}, state.paginator)
         };
         }
         */

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
