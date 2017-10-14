/**
 * Entity reducer
 * As entities share majority of the behaviors, so we use 1 generic reducer to
 * deal with all entities listed below, basically, all entities that can be
 * accessed by id can share the same reducer, (user entity can not use this).
 * post, topic, page, offer, newsletter, etc.
 * We will carry a selector key for each entity in the action payload, so we
 * can distinguish which entity list we are dealing with.
 */

import { Paginator }     from '../models';
import { Entity }        from '../models';
import { ENTITY }        from '../models';

import * as entity from '../actions/entity';
import * as auth   from '../actions/auth';

/**
 * Entities state for each entity type
 */
export interface EntitiesState {
    idsTotal:   number[];  // IDs for all entities loaded to the client
    idsCurPage: number[];  // IDs for current page of entities
    idsEditing: number[];  // IDs for entities in editing mode
    idsContent: number[];  // IDs for entities have content loaded
    entities: { [id:number]: Entity }; // All entities loaded to client
    // Array of entity attribute names, indicates which
    // attribute of the entity changes
    dirtyMask: string[];
    isLoading: boolean;    // If the entities list is in loading
    paginator: Paginator;
}

/**
 * Initial state
 */
const initState: EntitiesState = {
    idsTotal: [], idsCurPage: [], idsEditing: [], idsContent: [],
    entities: {}, dirtyMask: [], isLoading: false,
    paginator: null
};


/**
 * Post reducer
 */
export function postsReducer(state = initState, action: entity.Actions | any): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.POST)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}


/**
 * Page reducer
 */
export function pagesReducer(state = initState, action: entity.Actions | any): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.PAGE)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}

/**
 * Topic/Deal topic reducer
 */
export function topicsReducer(state = initState, action: entity.Actions | any): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.TOPIC)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}

/**
 * Places reducer
 */
export function placesReducer(state = initState, action: entity.Actions | any): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.PLACE)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}

/**
 * Offer reducer
 */
export function offersReducer(state = initState, action: entity.Actions | any): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.OFFER)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}

/**
 * Email reducer
 */
export function emailsReducer(state = initState, action: entity.Actions | any): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.NEWSLETTER)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}

/**
 * Attachment reducer
 */
export function attachsReducer(state = initState, action: entity.Actions | any): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.ATTACHMENT)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}

/**
 * Comment reducer
 */
export function commentsReducer(state = initState, action: entity.Actions | any): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.COMMENT)
        return entitiesReducer(action.payload.etype, state, action);

    return state;
}

/**
 * Advertise reducer
 */
export function adsReducer(state = initState, action: entity.Actions | any): EntitiesState {
    if (!action.payload) return state;

    if (action.payload.etype === ENTITY.ADVERTISE)
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
                          action: entity.Actions | any): EntitiesState {

    switch (action.type)
    {
        case entity.LOAD_ENTITY:
        case entity.LOAD_ENTITIES:
        case entity.LOAD_ENTITIES_ON_SCROLL: {
            return Object.assign({}, state, {isLoading: true});
        }
            
        case entity.SEARCH_COMPLETE:
        case entity.LOAD_ENTITIES_SUCCESS:
        case entity.LOAD_ENTITIES_ON_SCROLL_SUCCESS: {
            const entities = action.payload.data.entities;

            let dirtyMask;

            // Extract entity ids of current page
            let idsCurPage = entities.map(p => p.id);

            if (action.type == entity.LOAD_ENTITIES_ON_SCROLL_SUCCESS) {
                // Keep dirtyMask
                dirtyMask = state.dirtyMask;
                // Early return if nothing is loaded
                if (!idsCurPage.length)
                    return Object.assign({}, state, {isLoading: false});

                // Merge idsCurPage with previously loaded ones
                idsCurPage = [...state.idsCurPage, ...idsCurPage].filter(
                    (elem, idx, self) => idx == self.indexOf(elem));
            } else {
                // Reset dirtyMask
                dirtyMask = [];
                // Early return if nothing is loaded
                if (!idsCurPage.length)
                    return Object.assign({}, state, {
                        idsCurPage: [],
                        dirtyMask: dirtyMask,
                        isLoading: false,
                        paginator: action.payload.data.paginator
                    });
            }

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
                entities:   Object.assign({}, state.entities, newEntities),
                dirtyMask:  dirtyMask,
                isLoading:  false,
                paginator:  action.payload.data.paginator
            });
        }

        case entity.BATCH_EDIT_ENTITIES: {
            return Object.assign({}, state, {idsEditing: action.payload.data});
        }

        case entity.CANCEL_BATCH_EDIT_ENTITIES: {
            return Object.assign({}, state, {idsEditing: []});
        }

        case entity.BATCH_EDIT_PREVIOUS_ENTITY: {
            // DO NOTHING IF WE ARE NOT FAST EDITING A SINGLE ENTITY
            if (state.idsEditing.length !== 1) return state;

            // Get previous entity id
            let idx = state.idsCurPage.indexOf(state.idsEditing[0]) - 1;
            if (idx < 0) idx = 0;
            const previousId = state.idsCurPage[idx];

            return Object.assign({}, state, {idsEditing: [previousId]});
        }

        case entity.BATCH_EDIT_NEXT_ENTITY: {
            // DO NOTHING IF WE ARE NOT FAST EDITING A SINGLE ENTITY
            if (state.idsEditing.length !== 1) return state;

            // Get next entity id
            let idx = state.idsCurPage.indexOf(state.idsEditing[0]) + 1;
            if (idx > state.idsCurPage.length - 1)
                idx = state.idsCurPage.length - 1;
            const nextId = state.idsCurPage[idx];

            return Object.assign({}, state, {idsEditing: [nextId]});
        }

        case entity.SAVE_ENTITY_SUCCESS:
        case entity.LOAD_ENTITY_SUCCESS: {
            // If we have newly created entity in editing, remove the
            // placeholder id as we got a real id for it
            let idsTotal, idsCurPage, idsContent;
            if (state.idsEditing.indexOf(0)) {
                idsTotal   = state.idsTotal.filter(id => id != 0);
                idsCurPage = state.idsCurPage.filter(id => id != 0);
                idsContent = state.idsContent.filter(id => id != 0);
            } else {
                idsTotal   = state.idsTotal;
                idsCurPage = state.idsCurPage;
                idsContent = state.idsContent;
            }

            // Newly loaded entity id or saved new entity with newly created id
            const id = +action.payload.data['id'];

            // Should the entity be inserted at the beginning of the list
            const prepend = action.payload.prepend;

            // Merge with idsTotal
            if (prepend) {
                idsTotal = (idsTotal.indexOf(id) === -1) ?
                    [id, ...idsTotal] : idsTotal;

                // Merge with idsCurPage
                idsCurPage = (idsCurPage.indexOf(id) === -1) ?
                    [id, ...idsCurPage] : idsCurPage;

                // Merge with idsContent
                idsContent = (idsContent.indexOf(id) === -1) ?
                    [id, ...idsContent] : idsContent;
            }  else {
                idsTotal = (idsTotal.indexOf(id) === -1) ?
                    [...idsTotal, id] : idsTotal;

                // Merge with idsCurPage
                idsCurPage = (idsCurPage.indexOf(id) === -1) ?
                    [...idsCurPage, id] : idsCurPage;

                // Merge with idsContent
                idsContent = (idsContent.indexOf(id) === -1) ?
                    [...idsContent, id] : idsContent;
            }

            // Return state merged with newly loaded entity
            return Object.assign({}, state, {
                idsTotal:   idsTotal,
                idsCurPage: idsCurPage,
                idsEditing: [id],
                idsContent: idsContent,
                entities:   Object.assign({},
                    state.entities, {[id]: action.payload.data}),
                dirtyMask:  [],
                isLoading:  false,
                paginator:  state.paginator
            });
        }

        case entity.AUTO_SAVE_SUCCESS: {
            return Object.assign({}, state, {
                dirtyMask:  [],
                isLoading:  false,
            });
        }

        // Create a new entity, use id '0' as placeholder id
        case entity.NEW_ENTITY: {

            // There is already have a new entity created and not saved yet.
            if (state.idsEditing[0] === 0) return state;

            const user = action.payload.data;

            let newUser: any = {id: user.id, text: user.display_name};
            let newEntity: Entity = {
                id: 0,
                status: 'unsaved',
                author_id: user.id,
                author: newUser,
                editor_id: user.id,
                editor: newUser,
            };

            return Object.assign({}, state, {
                idsTotal:   [...state.idsTotal, newEntity.id],
                idsCurPage: [...state.idsCurPage, newEntity.id],
                idsEditing: [newEntity.id],
                idsContent: [...state.idsContent, newEntity.id],
                entities:   Object.assign({}, state.entities, {[newEntity.id]: newEntity}),
                // We specify id as dirty so that we know this is a new entity
                // from effects.
                dirtyMask:  ['id', 'state', 'author_id', 'editor_id'],
                isLoading:  false,
                paginator:  state.paginator
            });
        }

        // Delete an entity by id
        case entity.DELETE_ENTITY: {
            let id = action.payload.data;

            // Can't find the entity to delete.
            if (state.idsTotal.indexOf(id) === -1) return state;

            let idx = state.idsTotal.indexOf(id);
            let newIdsTotal = [...state.idsTotal.slice(0,idx), ...state.idsTotal.slice(idx+1)];

            idx = state.idsCurPage.indexOf(id);
            let newIdsCurPage = [...state.idsCurPage.slice(0, idx), ...state.idsCurPage.slice(idx+1)];

            idx = state.idsEditing.indexOf(id);
            let newIdsEditing = [...state.idsEditing.slice(0, idx), ...state.idsEditing.slice(idx+1)];

            idx = state.idsContent.indexOf(id);
            let newIdsContent = [...state.idsContent.slice(0, idx), ...state.idsContent.slice(idx+1)];

            let newEntities = Object.assign({}, state.entities, {[id]: null});

            return Object.assign({}, state, {
                idsTotal:   newIdsTotal,
                idsCurPage: newIdsCurPage,
                idsEditing: newIdsEditing,
                idsContent: newIdsContent,
                entities:   newEntities,
                dirtyMask:  [],
                isLoading:  false,
                paginator:  state.paginator
            });
        }

        case entity.REFRESH_ACTIVITY_STATUS: {
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
                entities: Object.assign({}, state.entities, newEntities),
            });
        }

        case entity.ATTACH: {
            // Each relationship is going to attach to entity has a name 'key',
            // and has value.id as the unique identity, we support string
            // match the value if no id specified.
            const key   = action.payload.key;
            const value = action.payload.value;
            const rid   = value.id;

            if (!key) {
                console.error("Failed to attach relationship!");
                return state;
            }

            const newEntityArray = state.idsEditing.map(id => {
                const oldEntity = state.entities[id];

                if (key in oldEntity && oldEntity[key]) {
                    // Entity has an relationship 'key'
                    let isDup;
                    let attrs = oldEntity[key];
                    // If 'id' is specified with relationship, we index the
                    // relationship with 'id', otherwise assume the whole
                    // item as string.
                    if (typeof rid !== "undefined") {
                        isDup = attrs.filter(item => item.id === rid);
                    } else {
                        attrs = attrs.split(',');
                        isDup = attrs.filter(item => item === value);
                    }

                    if (isDup && isDup.length) {
                        // Relationship is already with the entity, do not modify
                        return oldEntity;
                    } else {
                        // Create a new entity with the relationship
                        let newAttrs: any = [...attrs, value];
                        if (typeof rid === "undefined") // stringish attributes
                            newAttrs = newAttrs.join(',');
                        return Object.assign({}, oldEntity, {[key]: newAttrs});
                    }
                } else {
                    // Entity doesn't have an attribute 'key', create it
                    // with the only relationship
                    let attr;
                    if (typeof rid !== "undefined") attr = [value];
                    else     attr = value;
                    return Object.assign({}, oldEntity, {[key]: attr});
                }
            });

            let newEntities: { [id: number]: Entity } = {};
            newEntityArray.forEach(entity => newEntities[entity.id] = entity);

            return Object.assign({}, state, {
                entities:   Object.assign({}, state.entities, newEntities),
                dirtyMask:  [...state.dirtyMask, key],
            });
        }

        case entity.DETACH: {
            // Entity relationship is detached by given relationship id
            const key   = action.payload.key;
            const value = action.payload.value;
            const rid   = value.id;

            if (!key) {
                console.error("Failed to detach relationship!");
                return state;
            }

            const newEntityArray = state.idsEditing.map(id => {
                const oldEntity = state.entities[id];
                // Filter out given relationship
                let attrs = oldEntity[key];
                let newAttrs;

                if (rid) {
                    newAttrs = attrs.filter(item => item.id !== rid);
                } else {
                    attrs = attrs.split(',');
                    newAttrs = attrs.filter(item => item !== value);
                    newAttrs = newAttrs.join(',');
                }

                return Object.assign({}, oldEntity, {[key]: newAttrs});
            });

            let newEntities: { [id: number]: Entity } = {};
            newEntityArray.forEach(entity => newEntities[entity.id] = entity);

            return Object.assign({}, state, {
                entities:   Object.assign({}, state.entities, newEntities),
                dirtyMask:  [...state.dirtyMask, key],
            });
        }

        case entity.UPDATE: {
            let key   = action.payload.key;
            let value = action.payload.value;
            let entity = state.entities[state.idsEditing[0]];
            let dirtyMask = state.dirtyMask;

            if (!key) {
                console.error("Failed to update attributes!");
                return state;
            }

            if (value && value.hasOwnProperty("id")) {
                // Update corresponding entity.'key'_id column as well
                let idKey = key + '_id';
                entity = Object.assign({}, entity, {[idKey]: value.id, [key]: value});
                dirtyMask = [...dirtyMask, idKey];
            } else {
                entity = Object.assign({}, entity, {[key]: value});
                dirtyMask = [...dirtyMask, key];
            }

            return Object.assign({}, state, {
                entities: Object.assign({}, state.entities, {[entity.id]: entity}),
                dirtyMask: dirtyMask
            });
        }

        // Auto save entity to API server, but do not save reversions
        case entity.AUTO_SAVE:
        case entity.SAVE_ENTITY: {
            /*
            let entity = action.payload.data;
            // Assign default state to entity
            if (!entity.state || entity.state === 'unsaved')
                entity.state = 'draft';
            */
            return Object.assign({}, state, {isLoading:  true});
        }

        default:
            return state;
    }
}

/*****************************************************************************
 * Helper functions
 *****************************************************************************/

/**
 * Return the entities object which contains all entities
 */
export const getEntitiesObject = (state: EntitiesState) => state.entities;

/**
 * Return the dirty bit of entities under editing
 */
export const getIsDirty = (state: EntitiesState) => state.dirtyMask && state.dirtyMask.length > 0;

/**
 * Return the dirty bit of entities under editing
 */
export const getDirtyMask = (state: EntitiesState) => state.dirtyMask;


/**
 * Return if the single entity or entities list is in loading
 */
export const getIsLoading = (state: EntitiesState) => state.isLoading;

/**
 * Return a entity from current entity list by id
 */
export const getEntity = (state: EntitiesState, id: number) => state.entities[id];

/**
 * Return current editing entity author
 */
export const getAuthor = (entity: Entity) => {
    if (typeof entity != 'undefined') return entity.author;
};

/**
 * Return current editing entity editor
 */
export const getEditor = (entity: Entity) => {
    if (typeof entity != 'undefined') return entity.editor;
};

/**
 * Return current editing entity channel
 */
export const getChannelId = (entity: Entity) => {
    if (typeof entity != 'undefined') return entity.channel_id;
};

/**
 * Return current editing entity channel
 */
export const getChannel = (entity: Entity) => {
    if (typeof entity != 'undefined' && typeof entity.channel != 'undefined')
        return entity.channel;
};

/**
 * Return current editing entity topic type
 */
export const getTopicType = (entity: Entity) => {
    if (typeof entity != 'undefined') return entity.type;
};

/**
 * Return current editing entity keywords as array
 */
export const getKeywordsAsArray = (entity: Entity) => {
    if (typeof entity != 'undefined' && entity.keywords != null)
        return entity.keywords.split(',');
};

/**
 * Return current editing entity introduction
 */
export const getIntro = (entity: Entity) => {
    if (typeof entity != 'undefined') return entity.intro;
};

/**
 * Return current editing entity content
 */
export const getContent = (entity: Entity) => {
    if (typeof entity != 'undefined') return entity.content;
};

/**
 * Return current editing entity id
 */
export const getCurEntityId = (state: EntitiesState) => state.idsEditing[0];

/**
 * Return current editing entity
 */
export const getCurEntity = (state: EntitiesState) => state.entities[state.idsEditing[0]];

/**
 * Return current created new entity(id = 0)
 */
export const getCurNewEntity = (state: EntitiesState) => state.idsEditing[0] == 0 && state.entities[state.idsEditing[0]];

/**
 * Return an array of entites of given ids
 * Use getEntitiesObject instead
 */
//export const getEntities = (state: EntitiesState, ids: number[]) => ids.map(id => state.entities[id]);

/**
 * Return an array of entity ids of current page
 */
export const getIdsCurPage = (state: EntitiesState) => state.idsCurPage.filter(id => id != 0);

/**
 * Return an array of entity ids of this is in editing mode
 */
export const getIdsEditing = (state: EntitiesState) => state.idsEditing;

/**
 * If the entity exists in the entity list of current page
 */
//export const hasEntityInCurPage = (state: EntitiesState, id: number) => state.idsCurPage.find(id);


/**
 * If the entity exists in the all entities loaded to client
 */
//export const hasEntity = (state: EntitiesState, id: number) => state.idsTotal.find(id);

/**
 * Return current paginator
 */
export const getPaginator = (state: EntitiesState) => state.paginator;
