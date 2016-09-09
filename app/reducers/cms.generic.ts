/**
 * Cms generic reducer, shared by topic, post and page
 */
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action }     from '@ngrx/store';

import { PostActions }  from '../actions';
import { TopicActions } from '../actions';
import { PageActions }  from '../actions';

// FIXME: We have build error on these template types, so use 'any' instead
// Template arguments:
// T : Cms type, one of Topic, Post, Page
// TA: Cms type action, one of TopicAction, PostAction, PageAction
// TS: Cms type state, one of TopicsState, PostsState, PagesState
export function cmsReducer (state: any, action: Action): any {
    switch (action.type)
    {
        case PostActions.SEARCH_COMPLETE:
        case PageActions.SEARCH_COMPLETE:
        case TopicActions.SEARCH_COMPLETE:
        case PostActions.LOAD_ENTITIES_SUCCESS:
        case PageActions.LOAD_ENTITIES_SUCCESS:
        case TopicActions.LOAD_ENTITIES_SUCCESS: {
            const entities: any[] = action.payload.entities;
            const ids: number[] = entities.map(p => p.id);
            const newEntities   = entities.reduce(
                (entities: { [id: number]: any }, t: any) => {
                    return Object.assign(entities, { [t.id]: t });
                }, {});

            return {
                ids: [...ids],
                editing: [],
                entities: Object.assign({}, newEntities),
                paginator: Object.assign({}, action.payload.paginator)
            };
        }

        case PostActions.BATCH_EDIT_ENTITIES:
        case PageActions.BATCH_EDIT_ENTITIES:
        case TopicActions.BATCH_EDIT_ENTITIES: {
            return {
                ids: [...state.ids],
                editing: [...action.payload],
                entities: Object.assign({}, state.entities),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case PostActions.CANCEL_BATCH_EDIT_ENTITIES:
        case PageActions.CANCEL_BATCH_EDIT_ENTITIES:
        case TopicActions.CANCEL_BATCH_EDIT_ENTITIES: {
            return {
                ids: [...state.ids],
                editing: [],
                entities: Object.assign({}, state.entities),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case PostActions.BATCH_EDIT_PREVIOUS_ENTITY:
        case PageActions.BATCH_EDIT_PREVIOUS_ENTITY:
        case TopicActions.BATCH_EDIT_PREVIOUS_ENTITY: {
            // DO NOTHING IF WE ARE NOT FAST EDITING SINGLE T
            if (state.editing.length !== 1) return state;

            // Get previous t id
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

        case PostActions.BATCH_EDIT_NEXT_ENTITY:
        case PageActions.BATCH_EDIT_NEXT_ENTITY:
        case TopicActions.BATCH_EDIT_NEXT_ENTITY: {
            // DO NOTHING IF WE ARE NOT FAST EDITING SINGLE T
            if (state.editing.length !== 1) return state;

            // Get next t id
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

        case PostActions.SAVE_ENTITY_SUCCESS:
        case PageActions.SAVE_ENTITY_SUCCESS:
        case TopicActions.SAVE_ENTITY_SUCCESS:
        case PostActions.LOAD_ENTITY_SUCCESS:
        case PageActions.LOAD_ENTITY_SUCCESS:
        case TopicActions.LOAD_ENTITY_SUCCESS: {
            // Entity id
            const id: number = +action.payload['id'];

            // Update corresponding t from current entities list or create a
            // new list with 1 element.
            // TODO: Remove id 0 t
            return {
                ids: (state.ids.indexOf(id) === -1) ? [...state.ids, id] : [...state.ids],
                editing: [id],
                entities: Object.assign({}, state.entities, {[id]: action.payload}),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case PostActions.NEW_ENTITY:
        case PageActions.NEW_ENTITY:
        case TopicActions.NEW_ENTITY: {
            // Create a new entity, we use '0' as a placeholder id
            const id = 0;
            let newEntity: any =
             {state: 'unsaved', categories: [], tags: [], topics: []};

            return {
                ids: [...state.ids, id],
                editing: [id],
                entities: Object.assign({}, state.entities, {[id]: newEntity}),
                paginator: Object.assign({}, state.paginator)
            };
        }


        // Add a tag/topic/category to single/multiple t[s]
        case PostActions.ADD_TAG:
        case TopicActions.ADD_TAG:
        case PostActions.ADD_TOPIC:
        case TopicActions.ADD_POST:
        case PostActions.ADD_CATEGORY:
        case TopicActions.ADD_CATEGORY: {
            let key = 'categories';
            if (action.type == PostActions.ADD_TAG) key = 'tags';
            if (action.type == PostActions.ADD_TOPIC) key = 'topics';

            if (action.type == TopicActions.ADD_TAG) key = 'tags';
            if (action.type == TopicActions.ADD_POST) key = 'posts';

            const newArray = state.editing.map(id => {
                const oldEntity = state.entities[id];
                const isDup = oldEntity[key]
                    .filter(item => item.id === action.payload.id);
                if (isDup && isDup.length) {
                    // Use old entity in next state as nothing changes
                    return oldEntity;
                } else {
                    // Create a new t
                    const newItems = [...oldEntity[key], action.payload];
                    return Object.assign({}, oldEntity, {[key]: newItems});
                }
            });

            let newEntities: { [id: number]: any } = {};
            newArray.forEach(t => newEntities[t.id] = t);

            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, newEntities),
                paginator: Object.assign({}, state.paginator)
            };
        }

        // Remove a tag/topic/category from single/multiple entity/entities
        case PostActions.REMOVE_TAG:
        case PostActions.REMOVE_TOPIC:
        case PostActions.REMOVE_CATEGORY:
        case TopicActions.REMOVE_TAG:
        case TopicActions.REMOVE_POST:
        case TopicActions.REMOVE_CATEGORY: {
            let key = 'categories';
            if (action.type == PostActions.REMOVE_TAG) key = 'tags';
            if (action.type == PostActions.REMOVE_TOPIC) key = 'topics';

            if (action.type == TopicActions.REMOVE_TAG) key = 'tags';
            if (action.type == TopicActions.REMOVE_POST) key = 'posts';

            const newArray = state.editing.map(id => {
                const oldEntity = state.entities[id];
                const leftItems = oldEntity[key]
                    .filter(item => item.id !== action.payload);
                // Always return a new object
                return Object.assign({}, oldEntity, {[key]: leftItems});
            });

            let newEntities: { [id: number]: any } = {};
            newArray.forEach(t => newEntities[t.id] = t);

            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, newEntities),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case PostActions.APPLY_REVISION:
        case PageActions.APPLY_REVISION:
        case TopicActions.APPLY_REVISION: {
            const tid = action.payload[0];
            const revid = action.payload[1];
            // Get revision.body
            const newBody = state.entities[tid].revisions
                .filter(r => r.id === revid).map(r => r.body);
            // Apply revision.body to entity.content
            const newEntity = Object.assign({}, state.entities[tid],
                { content: newBody });
            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, {[tid]: newEntity}),
                paginator: Object.assign({}, state.paginator)
            }
        }

        case PostActions.REFRESH_ACTIVITY_STATUS:
        case PageActions.REFRESH_ACTIVITY_STATUS:
        case TopicActions.REFRESH_ACTIVITY_STATUS: {
            let newEntities: { [id: number]: any } = {};
            if (action.payload === null) {
                state.ids.forEach(id =>
                    newEntities[id] = Object.assign({},
                        state.entities[id], {activities: []}));
            } else {
                state.ids.forEach(id => {
                    const activities = action.payload.filter(a => a.content_id === id);
                    newEntities[id] = Object.assign({},
                        state.entities[id], {activities: activities})
                });
            }
            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, newEntities),
                paginator: Object.assign({}, state.paginator)
            };
        }

        /* This is a must, as we can get the updated t from its subscriber */
        /*
         case PostActions.SAVE_ENTITY: {
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
