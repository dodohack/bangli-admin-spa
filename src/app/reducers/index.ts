import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer
} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

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

import { User }        from '../models';
import { ENTITY_INFO, ENTITY } from '../models';

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
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<AppState> = {
    alerts:   alertsReducer,
    auth:     authReducer,
    users:    usersReducer,
    pref:     prefReducer,
    cms:      cmsReducer,
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
};

// Console.log all actions
export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return storeLogger()(reducer);
}

/**
 * We cache data that does not change frequently into localStorage by using
 * localStorageSync, instead of our own cache solution.
 */
export function localStorageCache(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return localStorageSync(['auth', 'pref', 'cms'], true)(reducer);
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of
 * meta-reducers that will be composed to from the root meta-reducer.
 */
export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? [localStorageCache, logger, storeFreeze]
    : [localStorageCache];

/*****************************************************************************
 * Auth
 *****************************************************************************/

/* Get AuthState from current AppState */
export const getAuthState = (state: AppState) => state.auth;

export const getAuthToken = createSelector(getAuthState, fromAuth.getAuthToken);

export const getAuthJwt = createSelector(getAuthState, fromAuth.getAuthJwt);

export const getDomainKeys = createSelector(getAuthState, fromAuth.getDomainKeys);

export const getDomains = createSelector(getAuthState, fromAuth.getDomains);

export const getDomainLatencies = createSelector(getAuthState, fromAuth.getDomainLatencies);

export const getProfiles = createSelector(getAuthState, fromAuth.getProfiles);

export const getAuthFail = createSelector(getAuthState, fromAuth.getAuthFail);

export const getCurDomainKey = createSelector(getAuthState, fromAuth.getCurDomainKey);

export const getCurDomain = createSelector(getAuthState, fromAuth.getCurDomain);

export const hasCurProfile = createSelector(getAuthState, fromAuth.hasCurProfile);

export const getCurProfile = createSelector(getAuthState, fromAuth.getCurProfile);

export const getMyId = createSelector(getAuthState, fromAuth.getMyId);

export const getMyRoleName = createSelector(getAuthState, fromAuth.getMyRoleName);

// FIXME: Argument to createSelector?
export const hasRole = (name: string) => createSelector(getAuthState, fromAuth.hasRole(name));

export const isDashboardUser = createSelector(getAuthState, fromAuth.isDashboardUser);

export const hasAuthorRole  = createSelector(getAuthState, fromAuth.hasAuthorRole);

export const hasEditorRole = createSelector(getAuthState, fromAuth.hasEditorRole);

export const hasAdminRole = createSelector(getAuthState, fromAuth.hasAdminRole);

export const hasSuperUserRole = createSelector(getAuthState, fromAuth.hasSuperUserRole);


/*****************************************************************************
 * CMS attributes
 *****************************************************************************/

/* Get CmsAttrsState from current AppState */
export const getCmsState = (state: AppState) => state.cms;

export const getAuthors = createSelector(getCmsState, fromCms.getAuthors);

export const getAuthorsObject = createSelector(getCmsState, fromCms.getAuthorsObject);

export const getEditors = createSelector(getCmsState, fromCms.getEditors);

export const getEditorsObject = createSelector(getCmsState, fromCms.getEditorsObject);

export const getCmsCurChannel = createSelector(getCmsState, fromCms.getCurChannel);

export const getCmsChannels = createSelector(getCmsState, fromCms.getChannels);

export const getCmsChannelsObject = createSelector(getCmsState, fromCms.getChannelsObject);

export const getCmsCategories = createSelector(getCmsState, fromCms.getCategories);

export const getCmsCurChannelCategories = createSelector(getCmsState, fromCms.getCurChannelCategories);

export const getCmsTopicTypes = createSelector(getCmsState, fromCms.getTopicTypes);

export const getCmsCurChannelTopicTypes = createSelector(getCmsState, fromCms.getCurChannelTopicTypes);

export const getCmsTopics = createSelector(getCmsState, fromCms.getTopics);

export const getLocations = createSelector(getCmsState, fromCms.getLocations);

export const getPostStates = createSelector(getCmsState, fromCms.getPostStates);

export const getDealStates = createSelector(getCmsState, fromCms.getDealStates);

export const getPageStates = createSelector(getCmsState, fromCms.getPageStates);

export const getTopicStates = createSelector(getCmsState, fromCms.getTopicStates);

/*****************************************************************************
 * User
 *****************************************************************************/
export const getUsersState = (state: AppState) => state.users;

export const isMyProfileUUID = (uuid: string) => createSelector(getUsersState, fromUsers.isMyProfile(uuid));

/**
 * If the current editing user has the same uuid as current dashboard user
 */
export function isMyProfile() {
    return (state$: Observable<AppState>) => state$
        .let(getAuthJwt())
        .switchMap(jwt => state$.let(isMyProfileUUID(jwt.sub)));
}

export const getUserIds = createSelector(getUsersState, fromUsers.getUserIds);

export const getUsers = createSelector(getUsersState, fromUsers.getUsers);

export const getUser = (uuid: string) => createSelector(getUsersState, fromUsers.getUser(uuid));

export const getAuthUser = createSelector(getUsersState, fromUsers.getAuthUser);

/**
 * Get current user in UsersState.idsEditing
 */
export const getCurUser = createSelector(getUsersState, fromUsers.getCurUser);

export const getIsUserLoading = createSelector(getUsersState, fromUsers.getIsUserLoading);

export const getUserPaginator = createSelector(getUsersState, fromUsers.getUserPaginator);

export const getAvailableDomains = createSelector(getUsersState, fromUsers.getAvailableDomains);

/*****************************************************************************
 * Entities - an entity type is always given
 *****************************************************************************/
/*
export function getEntitiesState(etype: string) {
    return (state$: Observable<AppState>) =>state$
        .select(ENTITY_INFO[etype].selector);
}
*/

export const getEntitiesStateFactory = (etype: string) =>
    createSelector([state => state], [state => state[ENTITY_INFO[etype].selector]]);

export const getEntitiesState = (state: AppState, etype: string) => state[ENTITY_INFO[etype].selector];

export const getPostsState = (state: AppState, etype: string) => state.posts;
export const getPagesState = (state: AppState, etype: string) => state.pages;
export const getDealsState = (state: AppState, etype: string) => state.deals;
export const getTopicsState = (state: AppState, etype: string) => state.topics;
export const getPlacesState = (state: AppState, etype: string) => state.places;
export const getAdsStates = (state: AppState, etype: string) => state.advertises;
export const getEmailsState = (state: AppState, etype: string) => state.newsletters;
export const getAttachsState = (state: AppState, etype: string) => state.attachments;
export const getCommentsState = (state: AppState, etype: string) => state.comments;

export const getPaginator = createSelector(getEntitiesStateFactory, fromEntities.getPaginator);

/*
export const getPaginator = (etype: string) => {
    switch (etype) {
        case ENTITY.CMS_POST:
            return createSelector(getEntitiesState(etype), fromEntities.getPaginator);

    }
    return compose(fromEntities.getPaginator(), getEntitiesState(etype));
};
*/

export function getIsDirty(etype: string) {
    return compose(fromEntities.getIsDirty(), getEntitiesState(etype));
}

export function getEntityDirtyMask(etype: string) {
    return compose(fromEntities.getDirtyMask(), getEntitiesState(etype));
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

export function getCurEntityId(etype: string) {
    return compose(fromEntities.getCurEntityId(), getEntitiesState(etype));
}

export function getCurEntity(etype: string) {
    return compose(fromEntities.getCurEntity(), getEntitiesState(etype));
}

export function getCurEntityAuthor(etype: string) {
    return compose(fromEntities.getAuthor(),
        fromEntities.getCurEntity(), getEntitiesState(etype));
}

export function getCurEntityEditor(etype: string) {
    return compose(fromEntities.getEditor(),
        fromEntities.getCurEntity(), getEntitiesState(etype));
}

// Deprecated
export function getCurEntityChannelId(etype: string) {
    return compose(fromEntities.getChannelId(),
        fromEntities.getCurEntity(), getEntitiesState(etype));
}

export function getCurEntityChannel(etype: string) {
    return compose(fromEntities.getChannel(),
        fromEntities.getCurEntity(), getEntitiesState(etype));
}

export function getCurEntityTopicType(etype: string) {
    return compose(fromEntities.getTopicType(),
        fromEntities.getCurEntity(), getEntitiesState(etype));
}

export function getCurEntityKeywordsAsArray(etype: string) {
    return compose(fromEntities.getKeywordsAsArray(),
        fromEntities.getCurEntity(), getEntitiesState(etype));
}

export function getCurEntityIntro(etype: string) {
    return compose(fromEntities.getIntro(),
        fromEntities.getCurEntity(), getEntitiesState(etype));
}

export function getCurEntityDealIntro(etype: string) {
    return compose(fromEntities.getDealIntro(),
        fromEntities.getCurEntity(), getEntitiesState(etype));
}

export function getCurEntityContent(etype: string) {
    return compose(fromEntities.getContent(),
        fromEntities.getCurEntity(), getEntitiesState(etype));
}

export function getCurEntityDealContent(etype: string) {
    return compose(fromEntities.getDealContent(),
        fromEntities.getCurEntity(), getEntitiesState(etype));
}

export function getCurEntityHasDeal(etype: string) {
    return compose(fromEntities.getHasDeal(),
        fromEntities.getCurEntity(), getEntitiesState(etype));
}


/*****************************************************************************
 * System
 *****************************************************************************/
export const getSysState = (state: AppState) => state.sys;

export const getUserRoles = createSelector(getSysState, fromSys.getUserRoles);

export const getThumbConfig = createSelector(getSysState, fromSys.getThumbConfig);

/*****************************************************************************
 * Frontend menu settings
 *****************************************************************************/
export const getFeMenusState = (state: AppState) => state.femenu;

export const getFeRootMenuIds = createSelector(getFeMenusState, fromFeMenu.getRootMenuIds);

export const getFeRootMenus = createSelector(getFeMenusState, fromFeMenu.getRootMenus);

export const getFeMenuGroupIds = createSelector(getFeMenusState, fromFeMenu.getMenuGroupIds);

export const getFeMenuParentIds = createSelector(getFeMenusState, fromFeMenu.getMenuParentIds);

export const getFeMenus = createSelector(getFeMenusState, fromFeMenu.getMenus);

export const getFeMobileMenus = createSelector(getFeMenusState, fromFeMenu.getMobileMenus);

export const getFeDesktopMenus= createSelector(getFeMenusState, fromFeMenu.getDesktopMenus);
