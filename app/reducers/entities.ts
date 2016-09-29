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

    let oldIds: number[], oldEditing: number[], oldEntities, oldPager;
    if (etype && state[etype]) {
        oldIds       = state[etype].ids;
        oldEditing   = state[etype].editing;
        oldEntities  = state[etype].entities;
        oldPager     = state[etype].paginator;
    } else {
        oldIds       = [];
        oldEditing   = [];
        oldEntities  = null;
        oldPager     = null;
    }

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

        // Append loaded entities to current entities instead of replace it
        case EntityActions.LOAD_ENTITIES_ON_SCROLL_SUCCESS: {
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
                        ids: [...oldIds, ...ids],
                        editing: oldEditing,
                        entities: Object.assign({}, oldEntities, newEntities),
                        paginator: action.payload.data.paginator
                    }
                });
        }

        case EntityActions.BATCH_EDIT_ENTITIES: {
            return Object.assign({}, state,
                {
                    [etype]: {
                        ids: oldIds,
                        editing: action.payload.data,
                        entities: oldEntities,
                        paginator: oldPager
                    }
                });
        }

        case EntityActions.CANCEL_BATCH_EDIT_ENTITIES: {
            return Object.assign({}, state,
                {
                    [etype]: {
                        ids: oldIds,
                        editing: [],
                        entities: oldEntities,
                        paginator: oldPager
                    }
                });
        }

        case EntityActions.BATCH_EDIT_PREVIOUS_ENTITY: {
            // DO NOTHING IF WE ARE NOT FAST EDITING SINGLE ENTITY
            if (oldEditing.length !== 1) return state;

            // Get previous entity id
            let idx = oldIds.indexOf(oldEditing[0]) - 1;
            if (idx < 0) idx = 0;
            const previousId = oldIds[idx];

            return Object.assign({}, state,
                {
                    [etype]: {
                        ids: oldIds,
                        editing: [previousId],
                        entities: oldEntities,
                        paginator: oldPager
                    }
                });
        }

        case EntityActions.BATCH_EDIT_NEXT_ENTITY: {
            // DO NOTHING IF WE ARE NOT FAST EDITING SINGLE ENTITY
            if (oldEditing.length !== 1) return state;

            // Get next entity id
            let idx = oldIds.indexOf(oldEditing[0]) + 1;
            if (idx > oldIds.length - 1) idx = oldIds.length - 1;
            const nextId = oldIds[idx];

            return Object.assign({}, state,
                {
                    [etype]: {
                        ids: oldIds,
                        editing: [nextId],
                        entities: oldEntities,
                        paginator: oldPager
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
                        ids: (oldIds.indexOf(id) === -1) ? [...oldIds, id] : oldIds,
                        editing: [id],
                        entities: Object.assign({}, oldEntities,
                            {[id]: action.payload.data}),
                        paginator: oldPager
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
                        ids: [...oldIds, id],
                        editing: [id],
                        entities: Object.assign({}, oldEntities, {[id]: newEntity}),
                        paginator: oldPager
                    }
                });
        }

        // Set/unset location of single/multiple entity[s]
        case EntityActions.TOGGLE_LOCATION: {
            let loc = action.payload.data;
            const newEntityArray = oldEditing.map(id => {
                const oldEntity  = oldEntities[id];
                const wasSet = oldEntity.location_id == loc.id ? true : false;
                if (wasSet) {
                    // Unset the location from the entity
                    return Object.assign({}, oldEntity, {['location_id']: 0, ['locations']: []});
                } else {
                    // Set the location to the entity
                    return Object.assign({}, oldEntity, {['location_id']: loc.id, ['locations']: [loc]});
                }
            });

            let newEntities: { [id: number]: Entity } = {};
            newEntityArray.forEach(entity => newEntities[entity.id] = entity);

            return Object.assign({}, state,
                {
                    [etype]: {
                        ids: oldIds,
                        editing: oldEditing,
                        entities: Object.assign({}, oldEntities, newEntities),
                        paginator: oldPager
                    }
                });
        }

        // Add a tag/topic/category to single/multiple entity[s]
        case EntityActions.ADD_TAG:
        case EntityActions.ATTACH_TOPIC_TO_ENTITY:
        case EntityActions.ADD_CATEGORY: {
            let key = 'categories';
            if (action.type == EntityActions.ADD_TAG) key = 'tags';
            if (action.type == EntityActions.ATTACH_TOPIC_TO_ENTITY) key = 'topics';

            const newEntityArray = oldEditing.map(id => {
                const oldEntity  = oldEntities[id];
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
                        ids: oldIds,
                        editing: oldEditing,
                        entities: Object.assign({}, oldEntities, newEntities),
                        paginator: oldPager
                    }
                });
        }

        // Remove a tag/topic/category from single/multiple entity[s]
        case EntityActions.REMOVE_TAG:
        case EntityActions.DETACH_TOPIC_FROM_ENTITY:
        case EntityActions.REMOVE_CATEGORY: {
            let key = 'categories';
            if (action.type == EntityActions.REMOVE_TAG) key = 'tags';
            if (action.type == EntityActions.DETACH_TOPIC_FROM_ENTITY) key = 'topics';

            const newEntityArray = oldEditing.map(id => {
                const oldEntity = oldEntities[id];
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
                        ids: oldIds,
                        editing: oldEditing,
                        entities: Object.assign({}, oldEntities, newEntities),
                        paginator: oldPager
                    }
                });
        }

        case EntityActions.APPLY_REVISION: {
            const id    = action.payload.data[0];
            const revid = action.payload.data[1];

            // Get revision.body
            const newBody = oldEntities[id].revisions
                .filter(r => r.id === revid).map(r => r.body);

            // Apply revision.body to entity.content
            const newEntity = Object.assign({}, oldEntities[id],
                                            { content: newBody });

            return Object.assign({}, state,
                {
                    [etype]: {
                        ids: oldIds,
                        editing: oldEditing,
                        entities: Object.assign({},
                            oldEntities, {[id]: newEntity}),
                        paginator: oldPager
                    }
                });
        }

        case EntityActions.REFRESH_ACTIVITY_STATUS: {
            let newEntities: { [id: number]: Entity } = {};
            let activities = action.payload.data;

            if (activities === null) {
                oldIds.forEach(id =>
                    newEntities[id] = Object.assign({},
                        oldEntities[id], {activities: []}));
            } else {
                oldIds.forEach(id => {
                    const newActivities = activities.filter(a => a.content_id === id);

                    newEntities[id] = Object.assign({},
                        oldEntities[id], {activities: newActivities})
                });
            }

            return Object.assign({}, state,
                {
                    [etype]: {
                        ids: oldIds,
                        editing: oldEditing,
                        entities: Object.assign({}, oldEntities, newEntities),
                        paginator: oldPager
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
                        ids: oldIds,
                        editing: oldEditing,
                        entities: Object.assign({},
                           oldEntities, {[id]: action.payload.data}),
                        paginator: oldPager
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
