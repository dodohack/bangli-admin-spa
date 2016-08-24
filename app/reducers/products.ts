/**
 * Shop product reducer 
 */
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action }     from '@ngrx/store';

import { Paginator }      from '../models';
import { Product }        from '../models';
import { ProductActions } from '../actions';

export interface ProductsState {
    ids: number[];
    entities: { [id: number]: Product };
    paginator: Paginator;
};

const initialState: ProductsState = {
    ids: [],
    entities: {},
    paginator: new Paginator
};

export default function (state = initialState, action: Action): ProductsState {
    switch (action.type)
    {
        case ProductActions.SEARCH_COMPLETE:
        case ProductActions.LOAD_PRODUCTS_SUCCESS: {
            const products: Product[] = action.payload.products;
            const ids: number[]       = products.map(p => p.id);
            const entities            = products.reduce(
                (entities: { [id: number]: Product }, product: Product) => {
                    product.selected = false;
                    return Object.assign(entities, { [product.id]: product });
                }, {});

            return {
                ids: [...ids],
                entities: Object.assign({}, entities),
                paginator: Object.assign({}, action.payload.paginator)
            };
        }

        case ProductActions.LOAD_PRODUCT_SUCCESS: {
            // Product id
            const id: number = +action.payload['id'];

            // Update corresponding product from current products list with
            // detailed information.
            if (state.ids.indexOf(id) !== -1) {
                return {
                    ids: [...state.ids],
                    // FIXME: 'selected' state is lost
                    entities: Object.assign({}, state.entities, {[id]: action.payload}),
                    paginator: Object.assign({}, state.paginator)
                }
            } else {
                return state;
            }
        }

        default: 
            return state;
    }
}

/**
 * Return a product from current product list by id
 */
export function getProduct(id: number) {
    return (state$: Observable<ProductsState>) =>
        state$.select(s => s.entities[id]);
}