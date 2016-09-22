/**
 * Deal topic reducer
 */
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action }     from '@ngrx/store';

import { Paginator }      from '../models';
import { Topic }        from '../models';
import { DealTopicActions } from '../actions';

export interface TopicsState {
    ids: number[];
    editing: number[];
    entities: { [id: number]: Topic };
    paginator: Paginator;
};

const initialState: TopicsState = {
    ids: [],
    editing: [],
    entities: {},
    paginator: new Paginator
};

export default function (state = initialState, action: Action): TopicsState {
    switch (action.type)
    {
        case DealTopicActions.SEARCH_COMPLETE:
        case DealTopicActions.LOAD_TOPICS_SUCCESS: {
            const topics: Topic[] = action.payload.topics;
            const ids: number[]       = topics.map(p => p.id);
            const entities            = topics.reduce(
                (entities: { [id: number]: Topic }, topic: Topic) => {
                    return Object.assign(entities, { [topic.id]: topic });
                }, {});

            return {
                ids: [...ids],
                editing: [],
                entities: Object.assign({}, entities),
                paginator: Object.assign({}, action.payload.paginator)
            };
        }

        case DealTopicActions.BATCH_EDIT_TOPICS: {
            return {
                ids: [...state.ids],
                editing: [...action.payload],
                entities: Object.assign({}, state.entities),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case DealTopicActions.CANCEL_BATCH_EDIT_TOPICS: {
            return {
                ids: [...state.ids],
                editing: [],
                entities: Object.assign({}, state.entities),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case DealTopicActions.BATCH_EDIT_PREVIOUS_TOPIC: {
            // DO NOTHING IF WE ARE NOT FAST EDITING SINGLE TOPIC
            if (state.editing.length !== 1) return state;

            // Get previous topic id
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

        case DealTopicActions.BATCH_EDIT_NEXT_TOPIC: {
            // DO NOTHING IF WE ARE NOT FAST EDITING SINGLE TOPIC
            if (state.editing.length !== 1) return state;

            // Get next topic id
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

        case DealTopicActions.SAVE_TOPIC_SUCCESS:
        case DealTopicActions.LOAD_TOPIC_SUCCESS: {
            // Topic id
            const id: number = +action.payload['id'];

            // Update corresponding topic from current topics list or create a
            // new list with 1 element.
            // TODO: Remove id 0 topic
            return {
                ids: (state.ids.indexOf(id) === -1) ? [...state.ids, id] : [...state.ids],
                editing: [id],
                entities: Object.assign({}, state.entities, {[id]: action.payload}),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case DealTopicActions.NEW_TOPIC: {
            // Create a new topic, we use '0' as a placeholder id
            const id = 0;
            let newTopic: Topic  = new Topic;
            newTopic.state      = 'unsaved';
            newTopic.categories = [];
            newTopic.tags       = [];
            newTopic.posts      = [];
            return {
                ids: [...state.ids, id],
                editing: [id],
                entities: Object.assign({}, state.entities, {[id]: newTopic}),
                paginator: Object.assign({}, state.paginator)
            };
        }


        // Add a tag/topic/category to single/multiple topic[s]
        case DealTopicActions.ADD_TAG:
        case DealTopicActions.ADD_POST:
        case DealTopicActions.ADD_CATEGORY: {
            let key = 'categories';
            if (action.type == DealTopicActions.ADD_TAG) key = 'tags';
            if (action.type == DealTopicActions.ADD_POST) key = 'posts';

            const newTopicArray = state.editing.map(id => {
                const oldTopic  = state.entities[id];
                const isDup = oldTopic[key]
                    .filter(item => item.id === action.payload.id);
                if (isDup && isDup.length) {
                    // Use old topic in next state as nothing changes
                    return oldTopic;
                } else {
                    // Create a new topic
                    const newItems = [...oldTopic[key], action.payload];
                    return Object.assign({}, oldTopic, {[key]: newItems});
                }
            });

            let newTopics: { [id: number]: Topic } = {};
            newTopicArray.forEach(topic => newTopics[topic.id] = topic);

            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, newTopics),
                paginator: Object.assign({}, state.paginator)
            };
        }

        // Remove a tag/topic/category from single/multiple topic[s]
        case DealTopicActions.REMOVE_TAG:
        case DealTopicActions.REMOVE_POST:
        case DealTopicActions.REMOVE_CATEGORY: {
            let key = 'categories';
            if (action.type == DealTopicActions.REMOVE_TAG) key = 'tags';
            if (action.type == DealTopicActions.REMOVE_POST) key = 'topics';

            const newTopicArray = state.editing.map(id => {
                const oldTopic = state.entities[id];
                const leftItems = oldTopic[key]
                    .filter(item => item.id !== action.payload);
                // Always return a new object
                return Object.assign({}, oldTopic, {[key]: leftItems});
            });

            let newTopics: { [id: number]: Topic } = {};
            newTopicArray.forEach(topic => newTopics[topic.id] = topic);

            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, newTopics),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case DealTopicActions.APPLY_REVISION: {
            const topicid = action.payload[0];
            const revid = action.payload[1];
            // Get revision.body
            const newBody = state.entities[topicid].revisions
                .filter(r => r.id === revid).map(r => r.body);
            // Apply revision.body to topic.content
            const newTopic = Object.assign({}, state.entities[topicid],
                { content: newBody });
            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, {[topicid]: newTopic}),
                paginator: Object.assign({}, state.paginator)
            }
        }

        case DealTopicActions.REFRESH_ACTIVITY_STATUS: {
            let newTopics: { [id: number]: Topic } = {};
            if (action.payload === null) {
                state.ids.forEach(id =>
                    newTopics[id] = Object.assign({},
                        state.entities[id], {activities: []}));
            } else {
                state.ids.forEach(id => {
                    const activities = action.payload.filter(a => a.content_id === id);
                    newTopics[id] = Object.assign({},
                        state.entities[id], {activities: activities})
                });
            }
            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, newTopics),
                paginator: Object.assign({}, state.paginator)
            };
        }

        /* This is a must, as we can get the updated topic from its subscriber */
        /*
         case DealTopicActions.SAVE_TOPIC: {
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
 * Return a topic from current topic list by id
 */
export function getTopic(id: number) {
    return (state$: Observable<TopicsState>) =>
        state$.select(s => s.entities[id]);
}