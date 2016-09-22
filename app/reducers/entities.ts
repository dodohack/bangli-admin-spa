/**
 * Entity reducer
 */
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action }     from '@ngrx/store';

import { Paginator }     from '../models';
import { Entity }        from '../models';
import { EntityActions } from '../actions';

export interface EntitiesState {
    ids: number[];
    editing: number[]; // Entity in editing state
    entities: { [id: number]: Entity };
    paginator: Paginator;
};

const initialState: EntitiesState = {
    ids: [],
    editing: [],
    entities: {},
    paginator: new Paginator
};

export default function <T>(state = initialState, action: Action): EntitiesState {
    switch (action.type)
    {
        case EntityActions.SEARCH_COMPLETE:
        case EntityActions.LOAD_ENTITIES_SUCCESS: {
            const entities: Entity[]  = action.payload.entities;
            const ids: number[]       = entities.map(p => p.id);
            const entities            = entities.reduce(
                (entities: { [id: number]: Entity }, entity: Entity) => {
                    return Object.assign(entities, { [entity.id]: entity });
                }, {});

            return {
                ids: [...ids],
                editing: [],
                entities: Object.assign({}, entities),
                paginator: Object.assign({}, action.payload.paginator)
            };
        }

        case EntityActions.BATCH_EDIT_ENTITIES: {
            return {
                ids: [...state.ids],
                editing: [...action.payload],
                entities: Object.assign({}, state.entities),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case EntityActions.CANCEL_BATCH_EDIT_ENTITIES: {
            return {
                ids: [...state.ids],
                editing: [],
                entities: Object.assign({}, state.entities),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case EntityActions.BATCH_EDIT_PREVIOUS_ENTITY: {
            // DO NOTHING IF WE ARE NOT FAST EDITING SINGLE ENTITY
            if (state.editing.length !== 1) return state;

            // Get previous entity id
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

        case EntityActions.BATCH_EDIT_NEXT_ENTITY: {
            // DO NOTHING IF WE ARE NOT FAST EDITING SINGLE ENTITY
            if (state.editing.length !== 1) return state;

            // Get next entity id
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

        case EntityActions.SAVE_ENTITY_SUCCESS:
        case EntityActions.LOAD_ENTITY_SUCCESS: {
            // Entity id
            const id: number = +action.payload['id'];

            // Update corresponding entity from current entities list or create a
            // new list with 1 element.
            // TODO: Remove id 0 entity
            return {
                ids: (state.ids.indexOf(id) === -1) ? [...state.ids, id] : [...state.ids],
                editing: [id],
                entities: Object.assign({}, state.entities, {[id]: action.payload}),
                paginator: Object.assign({}, state.paginator)
            };
        }
            
        case EntityActions.NEW_ENTITY: {
            // Create a new entity, we use '0' as a placeholder id
            const id = 0;
            let newEntity: Entity  = new Entity;
            newEntity.state      = 'unsaved';
            newEntity.categories = [];
            newEntity.tags       = [];
            newEntity.topics     = [];
            return {
                ids: [...state.ids, id],
                editing: [id],
                entities: Object.assign({}, state.entities, {[id]: newEntity}),
                paginator: Object.assign({}, state.paginator)
            };
        }


        // Add a tag/topic/category to single/multiple entity[s]
        case EntityActions.ADD_TAG:
        case EntityActions.ADD_TOPIC:
        case EntityActions.ADD_CATEGORY: {
            let key = 'categories';
            if (action.type == EntityActions.ADD_TAG) key = 'tags';
            if (action.type == EntityActions.ADD_TOPIC) key = 'topics';

            const newEntityArray = state.editing.map(id => {
                const oldEntity  = state.entities[id];
                const isDup = oldEntity[key]
                    .filter(item => item.id === action.payload.id);
                if (isDup && isDup.length) {
                    // Use old entity in next state as nothing changes
                    return oldEntity;
                } else {
                    // Create a new entity
                    const newItems = [...oldEntity[key], action.payload];
                    return Object.assign({}, oldEntity, {[key]: newItems});
                }
            });

            let newEntities: { [id: number]: Entity } = {};
            newEntityArray.forEach(entity => newEntities[entity.id] = entity);

            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, newEntities),
                paginator: Object.assign({}, state.paginator)
            };
        }

        // Remove a tag/topic/category from single/multiple entity[s]
        case EntityActions.REMOVE_TAG:
        case EntityActions.REMOVE_TOPIC:
        case EntityActions.REMOVE_CATEGORY: {
            let key = 'categories';
            if (action.type == EntityActions.REMOVE_TAG) key = 'tags';
            if (action.type == EntityActions.REMOVE_TOPIC) key = 'topics';

            const newEntityArray = state.editing.map(id => {
                const oldEntity = state.entities[id];
                const leftItems = oldEntity[key]
                    .filter(item => item.id !== action.payload);
                // Always return a new object
                return Object.assign({}, oldEntity, {[key]: leftItems});
            });

            let newEntities: { [id: number]: Entity } = {};
            newEntityArray.forEach(entity => newEntities[entity.id] = entity);

            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, newEntities),
                paginator: Object.assign({}, state.paginator)
            };
        }

        case EntityActions.APPLY_REVISION: {
            const entityid = action.payload[0];
            const revid = action.payload[1];
            // Get revision.body
            const newBody = state.entities[entityid].revisions
                .filter(r => r.id === revid).map(r => r.body);
            // Apply revision.body to entity.content
            const newEntity = Object.assign({}, state.entities[entityid],
                { content: newBody });
            return {
                ids: [...state.ids],
                editing: [...state.editing],
                entities: Object.assign({}, state.entities, {[entityid]: newEntity}),
                paginator: Object.assign({}, state.paginator)
            }
        }

        case EntityActions.REFRESH_ACTIVITY_STATUS: {
            let newEntities: { [id: number]: Entity } = {};
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

        /* This is a must, as we can get the updated entity from its subscriber */
        /*
        case EntityActions.SAVE_ENTITY: {
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
 * Return a entity from current entity list by id
 */
export function getEntity(id: number) {
    return (state$: Observable<EntitiesState>) =>
        state$.select(s => s.entities[id]);
}