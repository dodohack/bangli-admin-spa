/**
 * Bangli domain deal reducer
 */
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action }     from '@ngrx/store';

import { Paginator }   from '../models';
import { Deal }        from '../models';
import { DealActions } from '../actions';

export interface DealsState {
    ids: number[];
    entities: { [id: number]: Deal };
    paginator: Paginator;
};

const initialState: DealsState = {
    ids: [],
    entities: {},
    paginator: new Paginator
};

export default function (state = initialState, action: Action): DealsState {
    switch (action.type)
    {
        default:
            return state;
    }
}
