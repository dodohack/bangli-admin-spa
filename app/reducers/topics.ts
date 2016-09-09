/**
 * Cms topic reducer
 */
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action }     from '@ngrx/store';

import { cmsReducer } from './cms.generic';

import { Paginator }    from '../models';
import { Topic }        from '../models';
import { TopicActions } from '../actions';

export interface TopicsState {
    ids: number[];
    editing: number[]; // Topic in editing state
    entities: { [id: number]: Topic };
    paginator: Paginator;
};

const initialState: TopicsState = {
    ids: [],
    editing: [],
    entities: {},
    paginator: new Paginator
};

// This reducer is commonized to cmsReducer
export default function (state = initialState, action: Action): TopicsState {
    return cmsReducer(state, action);
}

/**
 * Return a topic from current topic list by id
 */
export function getTopic(id: number) {
    return (state$: Observable<TopicsState>) =>
        state$.select(s => s.entities[id]);
}