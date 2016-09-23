/**
 * Entity reducer
 * As entities share majority of the behaviors, so we use 1 generic reducer to
 * deal with all entities listed below, basically, all entities that can be
 * accessed by id can share the same reducer, (user entity can not use this).
 * cms post, cms topic, cms page, deal post, shop order, shop product,
 * voucher, newsletter, etc.
 * We will carry a selector key for each entity in the action payload, so we
 * can distinguish which entity list we are dealing with.
 */
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action }     from '@ngrx/store';

import { Paginator }     from '../models';
import { Entity }        from '../models';
import { EntityActions } from '../actions';

/**
 * Entities state for single entity type
 */
export interface EntitiesState {
    ids: number[];
    editing: number[];  // Entities in editing mode
    entities: { [id:number]: Entity };
    paginator: Paginator;
}

/**
 * Grouped entities state for all entity types
 */
export interface EntitiesStateGroup {
    // Entity type, ref models/entity.ts ENTITY for all posissble types
    // The data for different entity type is indexed by etype which is a
    // dynamic key of EntitiesState object.
    [etype: string] : EntitiesState
};

const initialState: EntitiesStateGroup = {
    /*
    [ENTITY.INVALID]: {
        ids: [],
        editing: [],
        entities: {},
        paginator: new Paginator
    }
    */
};

export default function (state = initialState, action: Action): EntitiesStateGroup {

    // Every action must comes with a entity type, see model/entity.ts ENTITY
    // for all possible types
    const etype: string = action.payload ? action.payload.etype : null;
    console.log("entity type: ", etype, ", action type: ", action.type);

    switch (action.type)
    {
        case EntityActions.SEARCH_COMPLETE:
        case EntityActions.LOAD_ENTITIES_SUCCESS: {
            // FIXME: paginator and entities in payload.data
            // Entities of current entity type
            const es: Entity[]    = action.payload.data.entities;
            // Extract entity ids
            const ids: number[]   = es.map(p => p.id);
            const newEntities     = es
                .reduce((entities: {[id: number]: Entity}, entity: Entity) => {
                    return Object.assign(entities, { [entity.id]: entity });
                }, {});

            // In each reduce action, we only process the action for a single
            // entity type, and we want to keep entities in other type untouched.
            return Object.assign({}, state,
                {
                    [etype]: {
                        ids: ids,
                        editing: [],
                        entities: newEntities,
                        paginator: action.payload.data.paginator
                    }
                });
        }

        case EntityActions.BATCH_EDIT_ENTITIES: {
            return Object.assign({}, state,
                {
                    [etype]: {
                        ids: state[etype].ids,
                        editing: action.payload.data,
                        entities: state[etype].entities,
                        paginator: state[etype].paginator
                    }
                });
        }

        case EntityActions.CANCEL_BATCH_EDIT_ENTITIES: {
            return Object.assign({}, state,
                {
                    [etype]: {
                        ids: state[etype].ids,
                        editing: [],
                        entities: state[etype].entities,
                        paginator: state[etype].paginator
                    }
                });
        }

        case EntityActions.BATCH_EDIT_PREVIOUS_ENTITY: {
            // DO NOTHING IF WE ARE NOT FAST EDITING SINGLE ENTITY
            if (state[etype].editing.length !== 1) return state;

            // Get previous entity id
            let idx = state[etype].ids.indexOf(state[etype].editing[0]) - 1;
            if (idx < 0) idx = 0;
            const previousId = state[etype].ids[idx];

            return Object.assign({}, state,
                {
                    [etype]: {
                        ids: state[etype].ids,
                        editing: [previousId],
                        entities: state[etype].entities,
                        paginator: state[etype].paginator
                    }
                });
        }

        case EntityActions.BATCH_EDIT_NEXT_ENTITY: {
            // DO NOTHING IF WE ARE NOT FAST EDITING SINGLE ENTITY
            if (state[etype].editing.length !== 1) return state;

            // Get next entity id
            let idx = state[etype].ids.indexOf(state[etype].editing[0]) + 1;
            if (idx > state[etype].ids.length - 1) idx = state[etype].ids.length - 1;
            const nextId = state[etype].ids[idx];

            return Object.assign({}, state,
                {
                    [etype]: {
                        ids: state[etype].ids,
                        editing: [nextId],
                        entities: state[etype].entities,
                        paginator: state[etype].paginator
                    }
                });
        }

        case EntityActions.SAVE_ENTITY_SUCCESS:
        case EntityActions.LOAD_ENTITY_SUCCESS: {
            // Entity id
            const id: number = +action.payload.data['id'];

            // Update corresponding entity from current entities list or create a
            // new list with 1 element.
            // TODO: Remove id 0 entity
            return Object.assign({}, state,
                {
                    [etype]: {
                        ids: (state[etype].ids.indexOf(id) === -1) ?
                            [...state[etype].ids, id] : state[etype].ids,
                        editing: [id],
                        entities: Object.assign({},
                            state[etype].entities, {[id]: action.payload.entities}),
                        paginator: state[etype].paginator
                    }
                });
        }
            
        case EntityActions.NEW_ENTITY: {
            // Create a new entity, we use '0' as a placeholder id
            const id = 0;
            let newEntity: Entity  = new Entity;
            newEntity.state      = 'unsaved';
            newEntity.categories = [];
            newEntity.tags       = [];
            newEntity.topics     = [];
            return Object.assign({}, state,
                {
                    [etype]: {
                        ids: [...state[etype].ids, id],
                        editing: [id],
                        entities: Object.assign({}, state[etype].entities, {[id]: newEntity}),
                        paginator: state[etype].paginator
                    }
                });
        }


        // Add a tag/topic/category to single/multiple entity[s]
        case EntityActions.ADD_TAG:
        case EntityActions.ATTACH_ENTITY_TO_TOPIC:
        case EntityActions.ADD_CATEGORY: {
            let key = 'categories';
            if (action.type == EntityActions.ADD_TAG) key = 'tags';
            if (action.type == EntityActions.ATTACH_ENTITY_TO_TOPIC) key = 'topics';

            const newEntityArray = state[etype].editing.map(id => {
                const oldEntity  = state[etype].entities[id];
                const isDup = oldEntity[key]
                    .filter(item => item.id === action.payload.data);
                if (isDup && isDup.length) {
                    // Use old entity in next state as nothing changes
                    return oldEntity;
                } else {
                    // Create a new entity
                    const newItems = [...oldEntity[key], action.payload.data];
                    return Object.assign({}, oldEntity, {[key]: newItems});
                }
            });

            let newEntities: { [id: number]: Entity } = {};
            newEntityArray.forEach(entity => newEntities[entity.id] = entity);

            return Object.assign({}, state,
                {
                    [etype]: {
                        ids: state[etype].ids,
                        editing: state[etype].editing,
                        entities: Object.assign({}, state[etype].entities, newEntities),
                        paginator: state[etype].paginator
                    }
                });
        }

        // Remove a tag/topic/category from single/multiple entity[s]
        case EntityActions.REMOVE_TAG:
        case EntityActions.DETACH_ENTITY_FROM_TOPIC:
        case EntityActions.REMOVE_CATEGORY: {
            let key = 'categories';
            if (action.type == EntityActions.REMOVE_TAG) key = 'tags';
            if (action.type == EntityActions.DETACH_ENTITY_FROM_TOPIC) key = 'topics';

            const newEntityArray = state[etype].editing.map(id => {
                const oldEntity = state[etype].entities[id];
                const leftItems = oldEntity[key]
                    .filter(item => item.id !== action.payload.data);
                // Always return a new object
                return Object.assign({}, oldEntity, {[key]: leftItems});
            });

            let newEntities: { [id: number]: Entity } = {};
            newEntityArray.forEach(entity => newEntities[entity.id] = entity);

            return Object.assign({}, state,
                {
                    [etype]: {
                        ids: state[etype].ids,
                        editing: state[etype].editing,
                        entities: Object.assign({}, state[etype].entities, newEntities),
                        paginator: state[etype].paginator
                    }
                });
        }

        case EntityActions.APPLY_REVISION: {
            const entityid = action.payload.data[0];
            const revid = action.payload.data[1];
            // Get revision.body
            const newBody = state[etype].entities[entityid].revisions
                .filter(r => r.id === revid).map(r => r.body);
            // Apply revision.body to entity.content
            const newEntity = Object.assign({}, state[etype].entities[entityid],
                { content: newBody });

            return Object.assign({}, state,
                {
                    [etype]: {
                        ids: state[etype].ids,
                        editing: state[etype].editing,
                        entities: Object.assign({},
                            state[etype].entities, {[entityid]: newEntity}),
                        paginator: state[etype].paginator
                    }
                });
        }

        case EntityActions.REFRESH_ACTIVITY_STATUS: {
            let newEntities: { [id: number]: Entity } = {};
            let activities = action.payload.data;

            if (activities === null) {
                state[etype].ids.forEach(id =>
                    newEntities[id] = Object.assign({},
                        state[etype].entities[id], {activities: []}));
            } else {
                state[etype].ids.forEach(id => {
                    const newActivities = activities.filter(a => a.content_id === id);

                    newEntities[id] = Object.assign({},
                        state[etype].entities[id], {activities: newActivities})
                });
            }

            return Object.assign({}, state,
                {
                    [etype]: {
                        ids: state[etype].ids,
                        editing: state[etype].editing,
                        entities: Object.assign({}, state[etype].entities, newEntities),
                        paginator: state[etype].paginator
                    }
                });
        }

        /* This is a must, as we can get the updated entity from its subscriber */
        /*
        case EntityActions.SAVE_ENTITY: {
            const id: number = +action.payload['id'];

            return Object.assign({}, state,
                {
                    [etype]: {
                        ids: state[etype].ids,
                        editing: state[etype].editing,
                        entities: Object.assign({},
                           state[etype].entities, {[id]: action.payload.entity}),
                        paginator: state[etype].paginator
                    }
                });
        }
        */

        default:
            return state;
    }
}

/**
 * Return a entity from current entity list by id
 */
export function getEntity(etype: string, id: number) {
    return (state$: Observable<EntitiesStateGroup>) =>
        state$.select(s => s[etype].entities[id]);
}
