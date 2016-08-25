/**
 * Cms topic reducer
 */
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action }     from '@ngrx/store';

import { Paginator }      from '../models';
import { Topic }        from '../models';
import { TopicActions } from '../actions';

export interface TopicsState {
    ids: number[];
    entities: { [id: number]: Topic };
    paginator: Paginator;
};

const initialState: TopicsState = {
    ids: [],
    entities: {},
    paginator: new Paginator
};

export default function (state = initialState, action: Action): TopicsState {
    switch (action.type)
    {
        case TopicActions.SEARCH_COMPLETE:
        case TopicActions.LOAD_TOPICS_SUCCESS: {
            const topics: Topic[] = action.payload.topics;
            const ids: number[]       = topics.map(p => p.id);
            const entities            = topics.reduce(
                (entities: { [id: number]: Topic }, topic: Topic) => {
                    topic.selected = false;
                    return Object.assign(entities, { [topic.id]: topic });
                }, {});

            return {
                ids: [...ids],
                entities: Object.assign({}, entities),
                paginator: Object.assign({}, action.payload.paginator)
            };
        }

        case TopicActions.LOAD_TOPIC_SUCCESS: {
            // Topic id
            const id: number = +action.payload['id'];

            // Update corresponding topic from current topics list with
            // detailed information.
            if (state.ids.indexOf(id) !== -1) {
                return {
                    ids: [...state.ids],
                    // FIXME: 'selected' state is lost
                    entities: Object.assign({}, state.entities, {[id]: action.payload}),
                    paginator: Object.assign({}, state.paginator)
                };
            } else {
                // Return single topic in the TopicsState
                return {
                    ids: [id],
                    entities: Object.assign({}, {[id]: action.payload}),
                    // paginator should be empty
                    paginator: Object.assign({}, state.paginator)
                };
            }
        }

        default:
            return state;
    }
}

/**
 * Return a topic from current topic list by id
 */
export function getTopic(id: number) {
    return (state$: Observable<TopicsState>) =>
        state$.select(s => s.entities[id]);
}