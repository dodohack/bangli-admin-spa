/**
 * Shop product reducer 
 */
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action }     from '@ngrx/store';

import { ProductActions } from '../actions';
import { Product }        from '../models';

export interface ProductsState {
    ids: string[];
    entities: { [id: string]: Product };
};

const initialState: ProductsState = {
    ids: [],
    entities: {}
};

export default function (state = initialState, action: Action): ProductsState {
    switch (action.type) {
        default: 
            return state;
    }
}