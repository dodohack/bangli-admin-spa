import { Action }         from '@ngrx/store';

import { Category }       from "../models";
import { Tag }            from "../models";
import { Topic }          from "../models";
import { Brand }          from '../models';
import { PRODUCT_STATES } from '../models';
import { ORDER_STATES }   from '../models';
import { ProductState }   from '../models';
import { OrderState }     from '../models';

import { ShopAttrActions } from '../actions';


export interface ShopAttrsState {
    categories: Category[];
    tags: Tag[];
    brands: Brand[];
    // available - all available options for given attributes defined locally
    // actual    - attributes with number of posts retrieved from server
    product_states: {available: ProductState[], actual: ProductState[]};
    order_states: {available: OrderState[], actual: OrderState[]};
};

const initialState: ShopAttrsState = {
    categories: [],
    tags: [],
    brands: [],
    product_states: {available: PRODUCT_STATES, actual: []},
    order_states:  {available: ORDER_STATES, actual: []}
};

export default function (state = initialState, action: Action): ShopAttrsState {
    switch (action.type)
    {
        case ShopAttrActions.LOAD_ALL_SUCCESS: {
            let categories: Category[];
            if (action.payload.categories)
                categories = action.payload.categories;

            let tags: Tag[];
            if (action.payload.tags)
                tags = action.payload.tags;

            let brands: Brand[];
            if (action.payload.brands)
                brands = action.payload.brands;

            let product_states: ProductState[];
            if (action.payload.product_states)
                product_states = action.payload.product_states;

            let order_states: OrderState[];
            if (action.payload.order_states)
                order_states = action.payload.order_states;
            
            return {
                categories: [...categories],
                tags: [...tags],
                brands: [...brands],
                product_states: Object.assign({},
                    state.product_states, {actual: product_states}),
                order_states:  Object.assign({},
                    state.order_states, {actual: order_states}),
            };
        }

        default:
            return state;
    }
}
