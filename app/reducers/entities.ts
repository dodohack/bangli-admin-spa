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
import { ENTITY }        from '../models';
import { EntityActions } from '../actions';

/**
 * Entities state for each entity type
 */
export interface EntitiesState {
    idsTotal:   number[];  // IDs for all entities loaded to the client
    idsCurPage: number[];  // IDs for current page of entities
    idsEditing: number[];  // IDs for entities in editing mode
    idsContent: number[];  // IDs for entities have content loaded
    entities: { [id:number]: Entity }; // All entities loaded to client
    paginator: Paginator;
}

/**
 * Initial state
 */
const initState: EntitiesState = {
    idsTotal: [], idsCurPage: [], idsEditing: [], idsContent: [],
    entities: {}, paginator: null
};


/**
 * Post reducer
 */
export function postsReducer(state = initState, action: Action): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.CMS_POST)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}


/**
 * Page reducer
 */
export function pagesReducer(state = initState, action: Action): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.CMS_PAGE)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}

/**
 * Topic/Deal topic reducer
 */
export function topicsReducer(state = initState, action: Action): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.CMS_TOPIC)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}

/**
 * Places reducer
 */
export function placesReducer(state = initState, action: Action): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.PLACE)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}

/**
 * Deal reducer
 */
export function dealsReducer(state = initState, action: Action): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.CMS_DEAL)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}

/**
 * Email reducer
 */
export function emailsReducer(state = initState, action: Action): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.NEWSLETTER)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}

/**
 * Attachment reducer
 */
export function attachsReducer(state = initState, action: Action): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.ATTACHMENT)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}

/**
 * Comment reducer
 */
export function commentsReducer(state = initState, action: Action): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.COMMENT)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}

/**
 * Advertise reducer
 */
export function adsReducer(state = initState, action: Action): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.ADVERTISE)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}

/**
 * Shop product reducer
 */
export function productsReducer(state = initState, action: Action): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.SHOP_PRODUCT)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}

/**
 * Shop order reducer
 */
export function ordersReducer(state = initState, action: Action): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.SHOP_ORDER)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}

/**
 * Shop voucher reducer
 */
export function vouchersReducer(state = initState, action: Action): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.SHOP_VOUCHER)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}


/**
 * FIXME: We are using lots of object references instead of copy of them
 * in returns, I'm not sure if this is safe to do so or not.
 *
 * This is the generic function for all entity type
 */
function entitiesReducer (etype: string,
                          state = initState,
                          action: Action): EntitiesState {

    switch (action.type)
    {
        case EntityActions.SEARCH_COMPLETE:
        case EntityActions.LOAD_ENTITIES_SUCCESS: {
            const entities = action.payload.data.entities;

            // Extract entity ids of current page
            const idsCurPage   = entities.map(p => p.id);

            // Early return if nothing is loaded
            if (!idsCurPage.length) return state;

            // Merge new idsCurPage with idsTotal
            const idsTotal = [...state.idsTotal, ...idsCurPage].filter(
                (elem, idx, self) => idx == self.indexOf(elem));

            // Get new entities and avoid local entities content isn't
            // overwritten by new entities with no content.
            const newEntities = entities.reduce((entities, entity) => {
                if (entity.id in state.idsContent) {
                    // This entity has the same id as local entities with
                    // content loaded
                    const e = Object.assign({}, entity,
                        {content: state.entities[entity.id].content});
                    return Object.assign(entities, {[entity.id]: e});
                } else {
                    // Completely new entity
                    return Object.assign(entities, {[entity.id]: entity});
                }
            }, {});

            // Return merged entities and updated ID indexes
            return Object.assign({}, state, {
                idsTotal:   idsTotal,
                idsCurPage: idsCurPage,
                idsEditing: state.idsEditing,
                idsContent: state.idsContent,
                entities:   Object.assign({}, state.entities, newEntities),
                paginator:  action.payload.data.paginator
            });
        }

        // Almost identical to previous case, but idsCurPage is merged with
        // newly loaded ones
        case EntityActions.LOAD_ENTITIES_ON_SCROLL_SUCCESS: {
            const entities = action.payload.data.entities;

            // Extract entity ids of current page
            const idsNew  = entities.map(p => p.id);

            // Early return if nothing is loaded
            if (!idsNew.length) return state;

            // Merge idsNew with idsCurPage
            const idsCurPage = [...state.idsCurPage, ...idsNew].filter(
                (elem, idx, self) => idx == self.indexOf(elem));

            // Merge idsNew with idsTotal
            const idsTotal = [...state.idsTotal, ...idsNew].filter(
                (elem, idx, self) => idx == self.indexOf(elem));

            // Get new entities and avoid local entities content isn't
            // overwritten by new entities with no content.
            const newEntities = entities.reduce((entities, entity) => {
                if (entity.id in state.idsContent) {
                    // This entity has the same id as local entities with
                    // content loaded
                    const e = Object.assign({}, entity,
                        {content: state.entities[entity.id].content});
                    return Object.assign(entities, {[entity.id]: e});
                } else {
                    // Completely new entity
                    return Object.assign(entities, {[entity.id]: entity});
                }
            }, {});

            // Return merged entities and updated ID indexes
            return Object.assign({}, state, {
                idsTotal:   idsTotal,
                idsCurPage: idsCurPage,
                idsEditing: state.idsEditing,
                idsContent: state.idsContent,
                entities:   Object.assign({}, state.entities, newEntities),
                paginator:  action.payload.data.paginator,
            });
        }

        case EntityActions.BATCH_EDIT_ENTITIES: {
            return Object.assign({}, state, {
                idsTotal:   state.idsTotal,
                idsCurPage: state.idsCurPage,
                idsEditing: action.payload.data,
                idsContent: state.idsContent,
                entities:   state.entities,
                paginator:  state.paginator
            });
        }

        case EntityActions.CANCEL_BATCH_EDIT_ENTITIES: {
            return Object.assign({}, state, {
                idsTotal: state.idsTotal,
                idsCurPage: state.idsCurPage,
                idsEditing: [],
                idsContent: state.idsContent,
                entities: state.entities,
                paginator: state.paginator
            });
        }

        case EntityActions.BATCH_EDIT_PREVIOUS_ENTITY: {
            // DO NOTHING IF WE ARE NOT FAST EDITING A SINGLE ENTITY
            if (state.idsEditing.length !== 1) return state;

            // Get previous entity id
            let idx = state.idsCurPage.indexOf(state.idsEditing[0]) - 1;
            if (idx < 0) idx = 0;
            const previousId = state.idsCurPage[idx];

            return Object.assign({}, state, {
                idsTotal:   state.idsTotal,
                idsCurPage: state.idsCurPage,
                idsEditing: [previousId],
                idsContent: state.idsContent,
                entities:   state.entities,
                paginator:  state.paginator
            });
        }

        case EntityActions.BATCH_EDIT_NEXT_ENTITY: {
            // DO NOTHING IF WE ARE NOT FAST EDITING A SINGLE ENTITY
            if (state.idsEditing.length !== 1) return state;

            // Get next entity id
            let idx = state.idsCurPage.indexOf(state.idsEditing[0]) + 1;
            if (idx > state.idsCurPage.length - 1)
                idx = state.idsCurPage.length - 1;
            const nextId = state.idsCurPage[idx];

            return Object.assign({}, state, {
                idsTotal:   state.idsTotal,
                idsCurPage: state.idsCurPage,
                idsEditing: [nextId],
                idsContent: state.idsContent,
                entities:   state.entities,
                paginator:  state.paginator
            });
        }

        case EntityActions.SAVE_ENTITY_SUCCESS:
        case EntityActions.LOAD_ENTITY_SUCCESS: {
            // Newly loaded entity id or saved new entity with newly created id
            const id = +action.payload.data['id'];

            // Merge with idsTotal
            const idsTotal = (state.idsTotal.indexOf(id) === -1) ?
                [...state.idsTotal, id] : state.idsTotal;

            // Merge with idsCurPage
            const idsCurPage = (state.idsCurPage.indexOf(id) === -1) ?
                [...state.idsCurPage, id] : state.idsCurPage;

            // Merge with idsContent
            const idsContent = (state.idsContent.indexOf(id) === -1) ?
                [...state.idsContent, id] : state.idsContent;

            // Return state merged with newly loaded entity
            return Object.assign({}, state, {
                idsTotal:   idsTotal,
                idsCurPage: idsCurPage,
                idsEditing: [id],
                idsContent: idsContent,
                entities:   Object.assign({}, state.entities, {[id]: action.payload.data}),
                paginator:  state.paginator
            });
        }

        // FIXME: Should we create empty '0' indexed entity here?
        case EntityActions.NEW_ENTITY: {
            // Create a new entity, we use id '0' as a placeholder id
            let newEntity = new Entity;

            newEntity.state = 'unsaved';
            // FIXME: We shouldn't create empty array for some entity, say
            // advertise, this casue api server error.
            /*
            newEntity.categories = [];
            newEntity.tags       = [];
            newEntity.topics     = [];
            */
            return Object.assign({}, state, {
                idsTotal:   state.idsTotal,
                idsCurPage: state.idsCurPage,
                idsEditing: [0],
                idsContent: state.idsContent,
                entities:   Object.assign({}, state.entities, {[0]: newEntity}),
                paginator:  state.paginator
            });
        }

        // Set/unset geo location of single/multiple entity[s]
        case EntityActions.TOGGLE_LOCATION: {
            let loc = action.payload.data;

            const newEntityArray = state.idsEditing.map(id => {

                const oldEntity = state.entities[id];
                const wasSet    = oldEntity.location_id == loc.id ? true : false;
                if (wasSet) {
                    // Unset the location from the entity
                    return Object.assign({}, oldEntity, {
                        ['location_id']: 0, ['locations']: []});
                } else {
                    // Set the location to the entity
                    return Object.assign({}, oldEntity, {
                        ['location_id']: loc.id, ['locations']: [loc]});
                }
            });

            let newEntities: { [id: number]: Entity } = {};
            newEntityArray.forEach(entity => newEntities[entity.id] = entity);

            return Object.assign({}, state, {
                idsTotal:   state.idsTotal,
                idsCurPage: state.idsCurPage,
                idsEditing: state.idsEditing,
                idsContent: state.idsContent,
                entities:   Object.assign({}, state.entities, newEntities),
                paginator:  state.paginator
            });
        }

        // Add a tag/topic/category to single/multiple entity[s]
        case EntityActions.ADD_TAG:
        case EntityActions.ATTACH_TOPIC_TO_ENTITY:
        case EntityActions.ADD_CATEGORY: {
            let key = 'categories';
            if (action.type == EntityActions.ADD_TAG) key = 'tags';
            if (action.type == EntityActions.ATTACH_TOPIC_TO_ENTITY) key = 'topics';

            const newEntityArray = state.idsEditing.map(id => {

                const oldEntity = state.entities[id];
                const isDup     = oldEntity[key]
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

            return Object.assign({}, state, {
                idsTotal:   state.idsTotal,
                idsCurPage: state.idsCurPage,
                idsEditing: state.idsEditing,
                idsContent: state.idsContent,
                entities:   Object.assign({}, state.entities, newEntities),
                paginator:  state.paginator
            });
        }

        // Remove a tag/topic/category from single/multiple entity[s]
        case EntityActions.REMOVE_TAG:
        case EntityActions.DETACH_TOPIC_FROM_ENTITY:
        case EntityActions.REMOVE_CATEGORY: {
            let key = 'categories';
            if (action.type == EntityActions.REMOVE_TAG) key = 'tags';
            if (action.type == EntityActions.DETACH_TOPIC_FROM_ENTITY) key = 'topics';

            const newEntityArray = state.idsEditing.map(id => {

                const oldEntity = state.entities[id];
                const leftItems = oldEntity[key]
                    .filter(item => item.id !== action.payload.data);
                // Always return a new object
                return Object.assign({}, oldEntity, {[key]: leftItems});

            });

            let newEntities: { [id: number]: Entity } = {};
            newEntityArray.forEach(entity => newEntities[entity.id] = entity);

            return Object.assign({}, state, {
                idsTotal:   state.idsTotal,
                idsCurPage: state.idsCurPage,
                idsEditing: state.idsEditing,
                idsContent: state.idsContent,
                entities:   Object.assign({}, state.entities, newEntities),
                paginator:  state.paginator
            });
        }

        case EntityActions.APPLY_REVISION: {
            const id    = action.payload.data[0];
            const revid = action.payload.data[1];

            // Get revision.body
            const newBody = state.entities[id].revisions
                .filter(r => r.id === revid).map(r => r.body);

            // Apply revision.body to entity.content
            const newEntity = Object.assign({}, state.entities[id],
                                            { content: newBody });

            return Object.assign({}, state, {
                idsTotal:   state.idsTotal,
                idsCurPage: state.idsCurPage,
                idsEditing: state.idsEditing,
                idsContent: state.idsContent,
                entities:   Object.assign({}, state.entities, {[id]: newEntity}),
                paginator:  state.paginator
            });
        }

        case EntityActions.REFRESH_ACTIVITY_STATUS: {
            let newEntities: { [id: number]: Entity } = {};
            let activities = action.payload.data;

            if (activities === null) {
                state.idsCurPage.forEach(id => newEntities[id] =
                    Object.assign({}, state.entities[id], {activities: []}));
            } else {
                state.idsCurPage.forEach(id => {
                    const newActivities = activities.filter(a => a.content_id === id);

                    newEntities[id] = Object.assign({},
                        state.entities[id], {activities: newActivities})
                });
            }

            return Object.assign({}, state, {
                idsTotal:   state.idsTotal,
                idsCurPage: state.idsCurPage,
                idsEditing: state.idsEditing,
                idsContent: state.idsContent,
                entities:   Object.assign({}, state.entities, newEntities),
                paginator:  state.paginator
            });
        }

        /* This is a must, as we can get the updated entity from its subscriber */
        /*
        case EntityActions.SAVE_ENTITY: {
            const id: number = +action.payload['id'];

            return Object.assign({}, state,
                {
                        ids: oldIds,
                        editing: oldEditing,
                        entities: Object.assign({},
                           oldEntities, {[id]: action.payload.data}),
                        paginator: oldPager
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
    return (state$: Observable<EntitiesState>) =>
        state$.select(s => s[etype].entities[id]);
}
