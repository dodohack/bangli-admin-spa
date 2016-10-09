/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose }         from '@ngrx/core/compose';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';

/**
 * Syncing between ngrx/store and browser local storage
 */
import { localStorageSync } from 'ngrx-store-localstorage';

/**
 * storeLogger is a powerful metareducer that logs out each time we dispatch
 * an action.
 *
 * A metareducer wraps a reducer function and returns a new reducer function
 * with superpowers. They are handy for all sorts of tasks, including
 * logging, undo/redo, and more.
 */
import { storeLogger }     from 'ngrx-store-logger';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze }     from 'ngrx-store-freeze';

import alertsReducer, * as fromAlerts     from './alerts';
import authReducer, * as fromAuth         from './auth';
import usersReducer, * as fromUsers       from './users';
import prefReducer, * as fromPref         from './preference';
import cmsReducer, * as fromCms           from './cmsattrs';
import shopReducer, * as fromShop         from './shopattrs';

import * as fromEntities from './entities';
import { EntitiesState } from './entities';
import { postsReducer }  from './entities';
import { pagesReducer }  from './entities';
import { topicsReducer } from './entities';
import { placesReducer } from './entities';
import { dealsReducer }  from './entities';
import { adsReducer }    from './entities';
import { attachsReducer }  from './entities';
import { emailsReducer }   from './entities';
import { commentsReducer } from './entities';
import { productsReducer } from './entities';
import { ordersReducer }   from './entities';
import { vouchersReducer } from './entities';


import { Observable } from 'rxjs/Observable';

import { User }        from '../models';
import { ENTITY_INFO } from '../models';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface AppState {
    alerts:   fromAlerts.AlertsState;
    auth:     fromAuth.AuthState;
    users:    fromUsers.UsersState;
    pref:     fromPref.PreferenceState;
    cms:      fromCms.CmsAttrsState;
    shop:     fromShop.ShopAttrsState;
    posts:    EntitiesState;
    pages:    EntitiesState;
    deals:    EntitiesState;
    topics:   EntitiesState;
    places:   EntitiesState;
    advertises:  EntitiesState;
    newsletters: EntitiesState;
    attachments: EntitiesState;
    comments: EntitiesState;
    products: EntitiesState;
    orders:   EntitiesState;
    vouchers: EntitiesState;
}


/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
export default compose(
    storeFreeze, storeLogger(),
    localStorageSync(['auth', 'pref', 'cms'], true),
    combineReducers
)
({
    alerts:   alertsReducer,
    auth:     authReducer,
    users:    usersReducer,
    pref:     prefReducer,
    cms:      cmsReducer,
    shop:     shopReducer,
    posts:    postsReducer,
    pages:    pagesReducer,
    deals:    dealsReducer,
    topics:   topicsReducer,
    places:   placesReducer,
    advertises:  adsReducer,
    newsletters: emailsReducer,
    attachments: attachsReducer,
    comments:    commentsReducer,
    products: productsReducer,
    orders:   ordersReducer,
    vouchers: vouchersReducer,
});

/*****************************************************************************
 * Auth
 *****************************************************************************/

/* Get AuthState from current AppState */
export function getAuthState() {
    return (state$: Observable<AppState>) =>
        state$.select(s => s.auth);
}
export function getAuthToken() {
    return fromAuth.getAuthToken();
}

export function isDashboardUser() {
    return compose(fromAuth.isDashboardUser(), getAuthState());
}

export function hasAuthorRole() {
    return compose(fromAuth.hasAuthorRole(), getAuthState());
}

export function hasEditorRole() {
    return compose(fromAuth.hasEditorRole(), getAuthState());
}

export function hasShopManagerRole() {
    return compose(fromAuth.hasShopManagerRole(), getAuthState());
}

export function hasAdminRole() {
    return compose(fromAuth.hasAdminRole(), getAuthState());
}

export function hasSuperUserRole() {
    return compose(fromAuth.hasSuperUserRole(), getAuthState());
}


/*****************************************************************************
 * CMS attributes
 *****************************************************************************/

/* Get CmsAttrsState from current AppState */
export function getCmsAttrsState() {
    return (state$: Observable<AppState>) => state$.select(s => s.cms);
}

export function getAuthors() {
    return compose(fromCms.getAuthors(), getCmsAttrsState());
}

export function getAuthorsObject() {
    return compose(fromCms.getAuthorsObject(), getCmsAttrsState());
}

export function getEditors() {
    return compose(fromCms.getEditors(), getCmsAttrsState());
}

export function getEditorsObject() {
    return compose(fromCms.getEditorsObject(), getCmsAttrsState());
}

export function getCmsChannels() {
    return compose(fromCms.getChannels(), getCmsAttrsState());
}

export function getCmsCategories() {
    return compose(fromCms.getCategories(), getCmsAttrsState());
}

export function getLocations() {
    return compose(fromCms.getLocations(), getCmsAttrsState());
}

export function getPostStates() {
    return compose(fromCms.getPostStates(), getCmsAttrsState());
}

export function getPageStates() {
    return compose(fromCms.getPageStates(), getCmsAttrsState());
}

export function getTopicStates() {
    return compose(fromCms.getTopicStates(), getCmsAttrsState());
}

/*****************************************************************************
 * User
 *****************************************************************************/
export function getUsersState() {
    return (state$: Observable<AppState>) =>
        state$.select(s => s.users);
}

/* FIXME: */
export function getUsers(filter: any) {
    return getUsersState();
}

export function getUser(uuid: string) {
    return compose(fromUsers.getUser(uuid), getUsersState());
}

/*****************************************************************************
 * Entities - an entity type is always given
 *****************************************************************************/
export function getEntitiesState(etype: string) {
    return (state$: Observable<AppState>) =>state$
        .select(ENTITY_INFO[etype].selector);
}

export function getPaginator(etype: string) {
    return compose(fromEntities.getPaginator(), getEntitiesState(etype));
}

export function getIsDirty(etype: string) {
    return compose(fromEntities.getIsDirty(), getEntitiesState(etype));
}

export function getEntities(etype: string, ids: number[]) {
    return compose(fromEntities.getEntities(ids), getEntitiesState(etype));
}

export function getIdsCurPage(etype: string) {
    return compose(fromEntities.getIdsCurPage(), getEntitiesState(etype));
}

export function getIdsEditing(etype: string) {
    return compose(fromEntities.getIdsEditing(), getEntitiesState(etype));
}

export function getEntitiesCurPage(etype: string) {
    return (state$: Observable<AppState>) => state$
        .let(getIdsCurPage(etype))
        .switchMap(idsCurPage => state$.let(getEntities(etype, idsCurPage)));
}

export function getEntity(etype: string, id: number) {
    return compose(fromEntities.getEntity(id), getEntitiesState(etype));
}

export function getCurEntity(etype: string) {
    return compose(fromEntities.getCurEntity(), getEntitiesState(etype));
}

export function getCurEntityContent(etype: string) {
    return compose(fromEntities.getContent(),
        fromEntities.getCurEntity(), getEntitiesState(etype));
}

/*****************************************************************************
 * Product
 *****************************************************************************/
/*
export function getProductsState() {
    return (state$: Observable<AppState>) =>
        state$.select(s => s.entities);
}

export function getProduct(id: number) {
    return compose(fromEntities.getEntity(ENTITY.SHOP_PRODUCT, id), getProductsState());
}
*/

/*****************************************************************************
 * Post
 *****************************************************************************/
/*
export function getPostsState() {
    return (state$: Observable<AppState>) =>
        state$.select(s => s.entities);
}

export function getPost(id: number) {
    return compose(fromEntities.getEntity(ENTITY.CMS_POST, id), getPostsState());
}

export function isPostLocked() {
    
}
*/

/*****************************************************************************
 * Topic
 *****************************************************************************/
/*
export function getTopicsState() {
    return (state$: Observable<AppState>) =>
        state$.select(s => s.entities);
}

export function getTopic(id: number) {
    return compose(fromEntities.getEntity(ENTITY.CMS_TOPIC, id), getTopicsState());
}
*/

/*****************************************************************************
 * Page
 *****************************************************************************/
/*
export function getPagesState() {
    return (state$: Observable<AppState>) =>
        state$.select(s => s.pages);
}

export function getPage(id: number) {
    return compose(fromPages.getPage(id), getPagesState());
}
*/