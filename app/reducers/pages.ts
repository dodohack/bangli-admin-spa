/**
 * Cms page reducer
 */
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action }     from '@ngrx/store';

import { cmsReducer }  from './cms.generic';

import { Paginator }      from '../models';
import { Page }        from '../models';
import { PageActions } from '../actions';

export interface PagesState {
    ids: number[];
    editing: number[];
    entities: { [id: number]: Page };
    paginator: Paginator;
};

const initialState: PagesState = {
    ids: [],
    editing: [],
    entities: {},
    paginator: new Paginator
};

// This reducer is commonized to cmsReducer
export default function (state = initialState, action: Action): PagesState {
    return cmsReducer(state, action);
}

/**
 * Return a page from current page list by id
 */
export function getPage(id: number) {
    return (state$: Observable<PagesState>) =>
        state$.select(s => s.entities[id]);
}
