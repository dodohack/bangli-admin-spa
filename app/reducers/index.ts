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
import sysReducer, * as fromSys           from './sysattrs';
import feMenuReducer, * as fromFeMenu     from './femenus';

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
    sys:      fromSys.SysAttrsState;
    femenu:   fromFeMenu.FeMenusState;
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
/**
 * We cache data that does not change frequently into localStorage by using
 * localStorageSync, instead of our own cache solution.
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
    sys:      sysReducer,
    femenu:   feMenuReducer,
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
    return compose(fromAuth.getAuthToken(), getAuthState());
}

export function getAuthJwt() {
    return compose(fromAuth.getAuthJwt(), getAuthState());
}

export function getDomainKeys() {
    return compose(fromAuth.getDomainKeys(), getAuthState());
}

export function getDomains() {
    return compose(fromAuth.getDomains(), getAuthState());
}

export function getDomainLatencies() {
    return compose(fromAuth.getDomainLatencies(), getAuthState());
}

export function getProfiles() {
    return compose(fromAuth.getProfiles(), getAuthState());
}

export function getAuthFail() {
    return compose(fromAuth.getAuthFail(), getAuthState());
}

export function getCurDomainKey() {
    return compose(fromAuth.getCurDomainKey(), getAuthState());
}

export function getCurDomain() {
    return compose(fromAuth.getCurDomain(), getAuthState());
}

export function hasCurProfile() {
    return compose(fromAuth.hasCurProfile(), getAuthState());
}

export function getCurProfile() {
    return compose(fromAuth.getCurProfile(), getAuthState());
}

export function getMyId() {
    return compose(fromAuth.getMyId(), getAuthState());
}

export function getMyRoleName() {
    return compose(fromAuth.getMyRoleName(), getAuthState());
}

export function hasRole(name: string) {
    return compose(fromAuth.hasRole(name), getAuthState());
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

export function getCmsCurChannel() {
    return compose(fromCms.getCurChannel(), getCmsAttrsState());
}

export function getCmsChannels() {
    return compose(fromCms.getChannels(), getCmsAttrsState());
}

export function getCmsChannelsObject() {
    return compose(fromCms.getChannelsObject(), getCmsAttrsState());
}

export function getCmsCategories() {
    return compose(fromCms.getCategories(), getCmsAttrsState());
}

export function getCmsCurChannelCategories() {
    return compose(fromCms.getCurChannelCategories(), getCmsAttrsState());
}

export function getCmsTopicTypes() {
    return compose(fromCms.getTopicTypes(), getCmsAttrsState());
}

export function getCmsCurChannelTopicTypes() {
    return compose(fromCms.getCurChannelTopicTypes(), getCmsAttrsState());
}

export function getCmsTopics() {
    return compose(fromCms.getTopics(), getCmsAttrsState());
}

export function getLocations() {
    return compose(fromCms.getLocations(), getCmsAttrsState());
}

export function getPostStates() {
    return compose(fromCms.getPostStates(), getCmsAttrsState());
}

export function getDealStates() {
    return compose(fromCms.getDealStates(), getCmsAttrsState());
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

export function isMyProfileUUID(uuid: string) {
    return compose(fromUsers.isMyProfile(uuid), getUsersState());
}

/**
 * If the current editing user has the same uuid as current dashboard user
 */
export function isMyProfile() {
    return (state$: Observable<AppState>) => state$
        .let(getAuthJwt())
        .switchMap(jwt => state$.let(isMyProfileUUID(jwt.sub)));
}

export function getUserIds() {
    return compose(fromUsers.getUserIds(), getUsersState());
}

export function getUsers() {
    return compose(fromUsers.getUsers(), getUsersState());
}

export function getUser(uuid: string) {
    return compose(fromUsers.getUser(uuid), getUsersState());
}

export function getAuthUser() {
    return compose(fromUsers.getAuthUser(), getUsersState());
}

/**
 * Get current user in UsersState.idsEditing
 */
export function getCurUser() {
    return compose(fromUsers.getCurUser(), getUsersState());
}

export function getIsUserLoading() {
    return compose(fromUsers.getIsUserLoading(), getUsersState());
}

export function getUserPaginator() {
    return compose(fromUsers.getUserPaginator(), getUsersState());
}

export function getAvailableDomains() {
    return compose(fromUsers.getAvailableDomains(), getUsersState());
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

export function getIsLoading(etype: string) {
    return compose(fromEntities.getIsLoading(), getEntitiesState(etype));
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

export function getCurEntityChannelId(etype: string) {
    return compose(fromEntities.getChannelId(),
        fromEntities.getCurEntity(), getEntitiesState(etype));
}

export function getCurEntityContent(etype: string) {
    return compose(fromEntities.getContent(),
        fromEntities.getCurEntity(), getEntitiesState(etype));
}

export function getCurEntityIntro(etype: string) {
    return compose(fromEntities.getIntro(),
        fromEntities.getCurEntity(), getEntitiesState(etype));
}

export function getCurEntityHasDeal(etype: string) {
    return compose(fromEntities.getHasDeal(),
        fromEntities.getCurEntity(), getEntitiesState(etype));
}



/*****************************************************************************
 * System
 *****************************************************************************/
export function getSysAttrsState() {
    return (state$: Observable<AppState>) => state$.select(s => s.sys);
}

export function getUserRoles() {
    return compose(fromSys.getUserRoles(), getSysAttrsState());
}

/*****************************************************************************
 * Frontend menu settings
 *****************************************************************************/
export function getFeMenusState() {
    return (state$: Observable<AppState>) => state$.select(s => s.femenu);
}

export function getFeRootMenuIds() {
    return compose(fromFeMenu.getRootMenuIds(), getFeMenusState());
}

export function getFeRootMenus() {
    return compose(fromFeMenu.getRootMenus(), getFeMenusState());
}

export function getFeMenuGroupIds() {
    return compose(fromFeMenu.getMenuGroupIds(), getFeMenusState());
}

export function getFeMenuParentIds() {
    return compose(fromFeMenu.getMenuParentIds(), getFeMenusState());
}

export function getFeMenus() {
    return compose(fromFeMenu.getMenus(), getFeMenusState());
}

export function getFeMobileMenus() {
    return compose(fromFeMenu.getMobileMenus(), getFeMenusState());
}

export function getFeDesktopMenus() {
    return compose(fromFeMenu.getDesktopMenus(), getFeMenusState());
}
