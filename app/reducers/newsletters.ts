/**
 * Cms newsletter reducer
 */
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action }     from '@ngrx/store';

import { Paginator }         from '../models';
import { Newsletter }        from '../models';
import { NewsletterActions } from '../actions';

export interface NewsletterState {
    ids: number[];
    entities: { [id: number]: Newsletter };
    paginator: Paginator;
};

const initialState: NewsletterState = {
    ids: [],
    entities: {},
    paginator: new Paginator
};

export default function (state = initialState, action: Action): NewsletterState {
    switch (action.type)
    {
        default:
            return state;
    }
}
