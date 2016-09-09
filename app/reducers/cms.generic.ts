/**
 * Cms generic reducer, shared by topic, post and page
 */
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action }     from '@ngrx/store';

// Template arguments:
// T : Cms type, one of Topic, Post, Page
// TA: Cms type action, one of TopicAction, PostAction, PageAction
// TS: Cms type state, one of TopicsState, PostsState, PagesState
export function cmsReducer<T, TA, TS> (state: TS, action: Action): TS {
    switch (action.type)
    {
        case TA.SEARCH_COMPLETE:
        case TA.LOAD_ENTITIES_SUCCESS: {
            const entities: T[] = action.payload.entities;
            const ids: number[]       = entities.map(p => p.id);
            const entities            = entities.reduce(
                (entities: { [id: number]: T }, t: T) => {
                    return Object.assign(entities, { [t.id]: t });
                }, {});

            return {
                ids: [...ids],
                editing: [],
                entities: Object.assign({}, entities),
                paginator: Object.assign({}, action.payload.paginator)
            };
        }

        case TA.BATCH_EDIT_ENTITIES: {
            return {
                ids: [...state.ids],
                editing: [...action.payload],
                entities: Object.assign({}, state.entities),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case TA.CANCEL_BATCH_EDIT_ENTITIES: {
            return {
                ids: [...state.ids],
                editing: [],
                entities: Object.assign({}, state.entities),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case TA.BATCH_EDIT_PREVIOUS_T: {
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

        case TA.BATCH_EDIT_NEXT_T: {
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

        case TA.SAVE_T_SUCCESS:
        case TA.LOAD_T_SUCCESS: {
            // T id
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

        case TA.NEW_T: {
            // Create a new t, we use '0' as a placeholder id
            const id = 0;
            let newT: T  = new T;
            newT.state      = 'unsaved';
            newT.categories = [];
            newT.tags       = [];
            newT.topics     = [];
            return {
                ids: [...state.ids, id],
                editing: [id],
                entities: Object.assign({}, state.entities, {[id]: newT}),
                paginator: Object.assign({}, state.paginator)
            };
        }


        // Add a tag/topic/category to single/multiple t[s]
        case TA.ADD_TAG:
        case TA.ADD_TOPIC:
        case TA.ADD_CATEGORY: {
            let key = 'categories';
            if (action.type == TA.ADD_TAG) key = 'tags';
            if (action.type == TA.ADD_TOPIC) key = 'topics';

            const newTArray = state.editing.map(id => {
                const oldT  = state.entities[id];
                const isDup = oldT[key]
                    .filter(item => item.id === action.payload.id);
                if (isDup && isDup.length) {
                    // Use old t in next state as nothing changes
                    return oldT;
                } else {
                    // Create a new t
                    const newItems = [...oldT[key], action.payload];
                    return Object.assign({}, oldT, {[key]: newItems});
                }
            });

            let newEntities: { [id: number]: T } = {};
            newTArray.forEach(t => newEntities[t.id] = t);

            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, newEntities),
                paginator: Object.assign({}, state.paginator)
            };
        }

        // Remove a tag/topic/category from single/multiple entity/entities
        case TA.REMOVE_TAG:
        case TA.REMOVE_TOPIC:
        case TA.REMOVE_CATEGORY: {
            let key = 'categories';
            if (action.type == TA.REMOVE_TAG) key = 'tags';
            if (action.type == TA.REMOVE_TOPIC) key = 'topics';

            const newTArray = state.editing.map(id => {
                const oldT = state.entities[id];
                const leftItems = oldT[key]
                    .filter(item => item.id !== action.payload);
                // Always return a new object
                return Object.assign({}, oldT, {[key]: leftItems});
            });

            let newEntities: { [id: number]: T } = {};
            newTArray.forEach(t => newEntities[t.id] = t);

            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, newEntities),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case TA.APPLY_REVISION: {
            const tid = action.payload[0];
            const revid = action.payload[1];
            // Get revision.body
            const newBody = state.entities[tid].revisions
                .filter(r => r.id === revid).map(r => r.body);
            // Apply revision.body to t.content
            const newT = Object.assign({}, state.entities[tid],
                { content: newBody });
            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, {[tid]: newT}),
                paginator: Object.assign({}, state.paginator)
            }
        }

        case TA.REFRESH_ACTIVITY_STATUS: {
            let newEntities: { [id: number]: T } = {};
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
         case TA.SAVE_T: {
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
