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
import { localStorageSync, LocalStorageConfig } from 'ngrx-store-localstorage';

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

import { RouterStateUrl } from '../utils';

import * as fromAlerts  from './alerts';
import * as fromAuth    from './auth';
import * as fromUsers   from './users';
import * as fromPref    from './preference';
import * as fromCms     from './cmsattrs';
import * as fromSys     from './sysattrs';
import * as fromFeMenu  from './femenus';

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
    alerts:   fromAlerts.alertsReducer,
    auth:     fromAuth.authReducer,
    users:    fromUsers.usersReducer,
    pref:     fromPref.prefReducer,
    cms:      fromCms.cmsReducer,
    sys:      fromSys.sysReducer,
    femenu:   fromFeMenu.feMenuReducer,
    posts:    postsReducer,
    pages:    pagesReducer,
    deals:    dealsReducer,
    topics:   topicsReducer,
    places:   placesReducer,
    advertises:  adsReducer,
    newsletters: emailsReducer,
    attachments: attachsReducer,
    comments:    commentsReducer,
    routerReducer: fromRouter.routerReducer,
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
    let lsc: LocalStorageConfig = {keys: ['auth', 'pref', 'cms'], rehydrate: true};
    return localStorageSync(lsc)(reducer);
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
//export const hasRole = (name: string) => createSelector(getAuthState, fromAuth.hasRole(name));

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

//export const isMyProfileUUID = (uuid: string) => createSelector(getUsersState, fromUsers.isMyProfile(uuid));

/**
 * If the current editing user has the same uuid as current dashboard user
 */
//export const isMyProfile = createSelector(getAuthJwt, fromUsers.getCurUserUuid, (jwt, uuid) => jwt.sub == uuid);

export const getUserIds = createSelector(getUsersState, fromUsers.getUserIds);

export const getUsers = createSelector(getUsersState, fromUsers.getUsers);

//export const getUser = (uuid: string) => createSelector(getUsersState, fromUsers.getUser(uuid));

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

/* FIXME: Can we have better way to reduce these massive code ? */
export const getPostsState = (state: AppState) => state.posts;
export const getPagesState = (state: AppState) => state.pages;
export const getDealsState = (state: AppState) => state.deals;
export const getTopicsState = (state: AppState) => state.topics;
export const getPlacesState = (state: AppState) => state.places;
export const getAdsState = (state: AppState) => state.advertises;
export const getEmailsState = (state: AppState) => state.newsletters;
export const getAttachsState = (state: AppState) => state.attachments;
export const getCommentsState = (state: AppState) => state.comments;

export const getPostPaginator = createSelector(getPostsState, fromEntities.getPaginator);
export const getPagePaginator = createSelector(getPagesState, fromEntities.getPaginator);
export const getDealPaginator = createSelector(getDealsState, fromEntities.getPaginator);
export const getTopicPaginator = createSelector(getTopicsState, fromEntities.getPaginator);
export const getPlacePaginator = createSelector(getPlacesState, fromEntities.getPaginator);
export const getAdPaginator = createSelector(getAdsState, fromEntities.getPaginator);
export const getEmailPaginator = createSelector(getEmailsState, fromEntities.getPaginator);
export const getAttachPaginator = createSelector(getAttachsState, fromEntities.getPaginator);
export const getCommentPaginator = createSelector(getCommentsState, fromEntities.getPaginator);
export function getPaginator(etype: string) {
    switch(etype) {
        case ENTITY.POST: return getPostPaginator;
        case ENTITY.PAGE: return getPagePaginator;
        case ENTITY.OFFER: return getDealPaginator;
        case ENTITY.TOPIC: return getTopicPaginator;
        case ENTITY.PLACE:     return getPlacePaginator;
        case ENTITY.ADVERTISE: return getAdPaginator;
        case ENTITY.NEWSLETTER: return getEmailPaginator;
        case ENTITY.ATTACHMENT: return getAttachPaginator;
        case ENTITY.COMMENT: return getCommentPaginator;
        default: console.error("REDUCER EXCEPTION!");
    }
}


export const getIsPostDirty = createSelector(getPostsState, fromEntities.getIsDirty);
export const getIsPageDirty = createSelector(getPagesState, fromEntities.getIsDirty);
export const getIsDealDirty = createSelector(getDealsState, fromEntities.getIsDirty);
export const getIsTopicDirty = createSelector(getTopicsState, fromEntities.getIsDirty);
export const getIsPlaceDirty = createSelector(getPlacesState, fromEntities.getIsDirty);
export const getIsAdDirty = createSelector(getAdsState, fromEntities.getIsDirty);
export const getIsEmailDirty = createSelector(getEmailsState, fromEntities.getIsDirty);
export const getIsAttachDirty = createSelector(getAttachsState, fromEntities.getIsDirty);
export const getIsCommentDirty = createSelector(getCommentsState, fromEntities.getIsDirty);
export function getIsDirty(etype: string) {
    switch(etype) {
        case ENTITY.POST: return getIsPostDirty;
        case ENTITY.PAGE: return getIsPageDirty;
        case ENTITY.OFFER: return getIsDealDirty;
        case ENTITY.TOPIC: return getIsTopicDirty;
        case ENTITY.PLACE:     return getIsPlaceDirty;
        case ENTITY.ADVERTISE: return getIsAdDirty;
        case ENTITY.NEWSLETTER: return getIsEmailDirty;
        case ENTITY.ATTACHMENT: return getIsAttachDirty;
        case ENTITY.COMMENT: return getIsCommentDirty;
        default: console.error("REDUCER EXCEPTION!");
    }
}



export const getPostDirtyMask = createSelector(getPostsState, fromEntities.getDirtyMask);
export const getPageDirtyMask = createSelector(getPagesState, fromEntities.getDirtyMask);
export const getDealDirtyMask = createSelector(getDealsState, fromEntities.getDirtyMask);
export const getTopicDirtyMask = createSelector(getTopicsState, fromEntities.getDirtyMask);
export const getPlaceDirtyMask = createSelector(getPlacesState, fromEntities.getDirtyMask);
export const getAdDirtyMask = createSelector(getAdsState, fromEntities.getDirtyMask);
export const getEmailDirtyMask = createSelector(getEmailsState, fromEntities.getDirtyMask);
export const getAttachDirtyMask = createSelector(getAttachsState, fromEntities.getDirtyMask);
export const getCommentDirtyMask = createSelector(getCommentsState, fromEntities.getDirtyMask);
export function getEntityDirtyMask(etype: string) {
    switch(etype) {
        case ENTITY.POST: return getPostDirtyMask;
        case ENTITY.PAGE: return getPageDirtyMask;
        case ENTITY.OFFER: return getDealDirtyMask;
        case ENTITY.TOPIC: return getTopicDirtyMask;
        case ENTITY.PLACE:     return getPlaceDirtyMask;
        case ENTITY.ADVERTISE: return getAdDirtyMask;
        case ENTITY.NEWSLETTER: return getEmailDirtyMask;
        case ENTITY.ATTACHMENT: return getAttachDirtyMask;
        case ENTITY.COMMENT: return getCommentDirtyMask;
        default: console.error("REDUCER EXCEPTION!");
    }
}


export const getIsPostLoading = createSelector(getPostsState, fromEntities.getIsLoading);
export const getIsPageLoading = createSelector(getPagesState, fromEntities.getIsLoading);
export const getIsDealLoading = createSelector(getDealsState, fromEntities.getIsLoading);
export const getIsTopicLoading = createSelector(getTopicsState, fromEntities.getIsLoading);
export const getIsPlaceLoading = createSelector(getPlacesState, fromEntities.getIsLoading);
export const getIsAdLoading = createSelector(getAdsState, fromEntities.getIsLoading);
export const getIsEmailLoading = createSelector(getEmailsState, fromEntities.getIsLoading);
export const getIsAttachLoading = createSelector(getAttachsState, fromEntities.getIsLoading);
export const getIsCommentLoading = createSelector(getCommentsState, fromEntities.getIsLoading);
export function getIsLoading(etype: string) {
    switch(etype) {
        case ENTITY.POST: return getIsPostLoading;
        case ENTITY.PAGE: return getIsPageLoading;
        case ENTITY.OFFER: return getIsDealLoading;
        case ENTITY.TOPIC: return getIsTopicLoading;
        case ENTITY.PLACE:     return getIsPlaceLoading;
        case ENTITY.ADVERTISE: return getIsAdLoading;
        case ENTITY.NEWSLETTER: return getIsEmailLoading;
        case ENTITY.ATTACHMENT: return getIsAttachLoading;
        case ENTITY.COMMENT: return getIsCommentLoading;
        default: console.error("REDUCER EXCEPTION!");
    }
}

// FIXME: Need extra argument ids: number[] to be passed in
export const getPostEntities = createSelector(getPostsState, fromEntities.getEntitiesObject);
export const getPageEntities = createSelector(getPagesState, fromEntities.getEntitiesObject);
export const getDealEntities = createSelector(getDealsState, fromEntities.getEntitiesObject);
export const getTopicEntities = createSelector(getTopicsState, fromEntities.getEntitiesObject);
export const getPlaceEntities = createSelector(getPlacesState, fromEntities.getEntitiesObject);
export const getAdEntities = createSelector(getAdsState, fromEntities.getEntitiesObject);
export const getEmailEntities = createSelector(getEmailsState, fromEntities.getEntitiesObject);
export const getAttachEntities = createSelector(getAttachsState, fromEntities.getEntitiesObject);
export const getCommentEntities = createSelector(getCommentsState, fromEntities.getEntitiesObject);
export function getEntities(etype: string) {
    switch(etype) {
        case ENTITY.POST: return getPostEntities;
        case ENTITY.PAGE: return getPageEntities;
        case ENTITY.OFFER: return getDealEntities;
        case ENTITY.TOPIC: return getTopicEntities;
        case ENTITY.PLACE:     return getPlaceEntities;
        case ENTITY.ADVERTISE: return getAdEntities;
        case ENTITY.NEWSLETTER: return getEmailEntities;
        case ENTITY.ATTACHMENT: return getAttachEntities;
        case ENTITY.COMMENT: return getCommentEntities;
        default: console.error("REDUCER EXCEPTION!");
    }
}

/*
export function getEntities(etype: string, ids: number[]) {
    return compose(fromEntities.getEntities(ids), getEntitiesState(etype));
}
*/


export const getPostIdsCurPage = createSelector(getPostsState, fromEntities.getIdsCurPage);
export const getPageIdsCurPage = createSelector(getPagesState, fromEntities.getIdsCurPage);
export const getDealIdsCurPage = createSelector(getDealsState, fromEntities.getIdsCurPage);
export const getTopicIdsCurPage = createSelector(getTopicsState, fromEntities.getIdsCurPage);
export const getPlaceIdsCurPage = createSelector(getPlacesState, fromEntities.getIdsCurPage);
export const getAdIdsCurPage = createSelector(getAdsState, fromEntities.getIdsCurPage);
export const getEmailIdsCurPage = createSelector(getEmailsState, fromEntities.getIdsCurPage);
export const getAttachIdsCurPage = createSelector(getAttachsState, fromEntities.getIdsCurPage);
export const getCommentIdsCurPage = createSelector(getCommentsState, fromEntities.getIdsCurPage);
export function getIdsCurPage(etype: string) {
    switch(etype) {
        case ENTITY.POST: return getPostIdsCurPage;
        case ENTITY.PAGE: return getPageIdsCurPage;
        case ENTITY.OFFER: return getDealIdsCurPage;
        case ENTITY.TOPIC: return getTopicIdsCurPage;
        case ENTITY.PLACE:     return getPlaceIdsCurPage;
        case ENTITY.ADVERTISE: return getAdIdsCurPage;
        case ENTITY.NEWSLETTER: return getEmailIdsCurPage;
        case ENTITY.ATTACHMENT: return getAttachIdsCurPage;
        case ENTITY.COMMENT: return getCommentIdsCurPage;
        default: console.error("REDUCER EXCEPTION!");
    }
}


export const getPostIdsEditing = createSelector(getPostsState, fromEntities.getIdsEditing);
export const getPageIdsEditing = createSelector(getPagesState, fromEntities.getIdsEditing);
export const getDealIdsEditing = createSelector(getDealsState, fromEntities.getIdsEditing);
export const getTopicIdsEditing = createSelector(getTopicsState, fromEntities.getIdsEditing);
export const getPlaceIdsEditing = createSelector(getPlacesState, fromEntities.getIdsEditing);
export const getAdIdsEditing = createSelector(getAdsState, fromEntities.getIdsEditing);
export const getEmailIdsEditing = createSelector(getEmailsState, fromEntities.getIdsEditing);
export const getAttachIdsEditing = createSelector(getAttachsState, fromEntities.getIdsEditing);
export const getCommentIdsEditing = createSelector(getCommentsState, fromEntities.getIdsEditing);
export function getIdsEditing(etype: string) {
    switch(etype) { 
        case ENTITY.POST: return getPostIdsEditing;
        case ENTITY.PAGE: return getPageIdsEditing;
        case ENTITY.OFFER: return getDealIdsEditing;
        case ENTITY.TOPIC: return getTopicIdsEditing;
        case ENTITY.PLACE:     return getPlaceIdsEditing;
        case ENTITY.ADVERTISE: return getAdIdsEditing;
        case ENTITY.NEWSLETTER: return getEmailIdsEditing;
        case ENTITY.ATTACHMENT: return getAttachIdsEditing;
        case ENTITY.COMMENT: return getCommentIdsEditing;
        default: console.error("REDUCER EXCEPTION!");
    }
}

export const getPostsCurPage = createSelector(getPostIdsCurPage, getPostEntities,
    (ids, entities) => ids.map(id => entities[id]));
export const getPagesCurPage = createSelector(getPageIdsCurPage, getPageEntities,
    (ids, entities) => ids.map(id => entities[id]));
export const getDealsCurPage = createSelector(getDealIdsCurPage, getDealEntities,
    (ids, entities) => ids.map(id => entities[id]));
export const getTopicsCurPage = createSelector(getTopicIdsCurPage, getTopicEntities,
    (ids, entities) => ids.map(id => entities[id]));
export const getPlacesCurPage = createSelector(getPlaceIdsCurPage, getPlaceEntities,
    (ids, entities) => ids.map(id => entities[id]));
export const getAdsCurPage = createSelector(getAdIdsCurPage, getAdEntities,
    (ids, entities) => ids.map(id => entities[id]));
export const getEmailsCurPage = createSelector(getEmailIdsCurPage, getEmailEntities,
    (ids, entities) => ids.map(id => entities[id]));
export const getAttachsCurPage = createSelector(getAttachIdsCurPage, getAttachEntities,
    (ids, entities) => ids.map(id => entities[id]));
export const getCommentsCurPage = createSelector(getCommentIdsCurPage, getCommentEntities,
    (ids, entities) => ids.map(id => entities[id]));
export function getEntitiesCurPage(etype: string) {
    switch(etype) {
        case ENTITY.POST: return getPostsCurPage;
        case ENTITY.PAGE: return getPagesCurPage;
        case ENTITY.OFFER: return getDealsCurPage;
        case ENTITY.TOPIC: return getTopicsCurPage;
        case ENTITY.PLACE:     return getPlacesCurPage;
        case ENTITY.ADVERTISE: return getAdsCurPage;
        case ENTITY.NEWSLETTER: return getEmailsCurPage;
        case ENTITY.ATTACHMENT: return getAttachsCurPage;
        case ENTITY.COMMENT: return getCommentsCurPage;
        default: console.error("REDUCER EXCEPTION!");
    }
}


// FIXME: We can access any entity in the entities returned by other selector
/*
export function getEntity(etype: string, id: number) {
    return compose(fromEntities.getEntity(id), getEntitiesState(etype));
}
*/

export const getCurPostId = createSelector(getPostsState, fromEntities.getCurEntityId);
export const getCurPageId = createSelector(getPagesState, fromEntities.getCurEntityId);
export const getCurDealId = createSelector(getDealsState, fromEntities.getCurEntityId);
export const getCurTopicId = createSelector(getTopicsState, fromEntities.getCurEntityId);
export const getCurPlaceId = createSelector(getPlacesState, fromEntities.getCurEntityId);
export const getCurAdId = createSelector(getAdsState, fromEntities.getCurEntityId);
export const getCurEmailId = createSelector(getEmailsState, fromEntities.getCurEntityId);
export const getCurAttachId = createSelector(getAttachsState, fromEntities.getCurEntityId);
export const getCurCommentId = createSelector(getCommentsState, fromEntities.getCurEntityId);
export function getCurEntityId(etype: string) {
    switch(etype) {
        case ENTITY.POST: return getCurPostId;
        case ENTITY.PAGE: return getCurPageId;
        case ENTITY.OFFER: return getCurDealId;
        case ENTITY.TOPIC: return getCurTopicId;
        case ENTITY.PLACE:     return getCurPlaceId;
        case ENTITY.ADVERTISE: return getCurAdId;
        case ENTITY.NEWSLETTER: return getCurEmailId;
        case ENTITY.ATTACHMENT: return getCurAttachId;
        case ENTITY.COMMENT: return getCurCommentId;
        default: console.error("REDUCER EXCEPTION!");
    }
}

export const getCurPost = createSelector(getPostsState, fromEntities.getCurEntity);
export const getCurPage = createSelector(getPagesState, fromEntities.getCurEntity);
export const getCurDeal = createSelector(getDealsState, fromEntities.getCurEntity);
export const getCurTopic = createSelector(getTopicsState, fromEntities.getCurEntity);
export const getCurPlace = createSelector(getPlacesState, fromEntities.getCurEntity);
export const getCurAd = createSelector(getAdsState, fromEntities.getCurEntity);
export const getCurEmail = createSelector(getEmailsState, fromEntities.getCurEntity);
export const getCurAttach = createSelector(getAttachsState, fromEntities.getCurEntity);
export const getCurComment = createSelector(getCommentsState, fromEntities.getCurEntity);
export function getCurEntity(etype: string) {
    switch(etype) {
        case ENTITY.POST: return getCurPost;
        case ENTITY.PAGE: return getCurPage;
        case ENTITY.OFFER: return getCurDeal;
        case ENTITY.TOPIC: return getCurTopic;
        case ENTITY.PLACE:     return getCurPlace;
        case ENTITY.ADVERTISE: return getCurAd;
        case ENTITY.NEWSLETTER: return getCurEmail;
        case ENTITY.ATTACHMENT: return getCurAttach;
        case ENTITY.COMMENT: return getCurComment;
        default: console.error("REDUCER EXCEPTION!");
    }
}

export const getAuthor = (posts: EntitiesState, id: number) => posts.entities[id].author;
export const getCurPostAuthor = createSelector(getPostsState, getCurPostId, getAuthor);
export const getCurPageAuthor = createSelector(getPagesState, getCurPageId, getAuthor);
export const getCurDealAuthor = createSelector(getDealsState, getCurDealId, getAuthor);
export const getCurTopicAuthor = createSelector(getTopicsState, getCurTopicId, getAuthor);
export const getCurPlaceAuthor = createSelector(getPlacesState, getCurPlaceId, getAuthor);
export const getCurAdAuthor = createSelector(getAdsState, getCurAdId, getAuthor);
export const getCurEmailAuthor = createSelector(getEmailsState, getCurEmailId, getAuthor);
export const getCurAttachAuthor = createSelector(getAttachsState, getCurAttachId, getAuthor);
export const getCurCommentAuthor = createSelector(getCommentsState, getCurCommentId, getAuthor);
export function getCurEntityAuthor(etype: string) {
    switch(etype) {
        case ENTITY.POST: return getCurPostAuthor;
        case ENTITY.PAGE: return getCurPageAuthor;
        case ENTITY.OFFER: return getCurDealAuthor;
        case ENTITY.TOPIC: return getCurTopicAuthor;
        case ENTITY.PLACE:     return getCurPlaceAuthor;
        case ENTITY.ADVERTISE: return getCurAdAuthor;
        case ENTITY.NEWSLETTER: return getCurEmailAuthor;
        case ENTITY.ATTACHMENT: return getCurAttachAuthor;
        case ENTITY.COMMENT: return getCurCommentAuthor;
        default: console.error("REDUCER EXCEPTION!");
    }
}

export const getEditor = (posts: EntitiesState, id: number) => posts.entities[id].editor;
export const getCurPostEditor = createSelector(getPostsState, getCurPostId, getEditor);
export const getCurPageEditor = createSelector(getPagesState, getCurPageId, getEditor);
export const getCurDealEditor = createSelector(getDealsState, getCurDealId, getEditor);
export const getCurTopicEditor = createSelector(getTopicsState, getCurTopicId, getEditor);
export const getCurPlaceEditor = createSelector(getPlacesState, getCurPlaceId, getEditor);
export const getCurAdEditor = createSelector(getAdsState, getCurAdId, getEditor);
export const getCurEmailEditor = createSelector(getEmailsState, getCurEmailId, getEditor);
export const getCurAttachEditor = createSelector(getAttachsState, getCurAttachId, getEditor);
export const getCurCommentEditor = createSelector(getCommentsState, getCurCommentId, getEditor);
export function getCurEntityEditor(etype: string) {
    switch(etype) {
        case ENTITY.POST: return getCurPostEditor;
        case ENTITY.PAGE: return getCurPageEditor;
        case ENTITY.OFFER: return getCurDealEditor;
        case ENTITY.TOPIC: return getCurTopicEditor;
        case ENTITY.PLACE:     return getCurPlaceEditor;
        case ENTITY.ADVERTISE: return getCurAdEditor;
        case ENTITY.NEWSLETTER: return getCurEmailEditor;
        case ENTITY.ATTACHMENT: return getCurAttachEditor;
        case ENTITY.COMMENT: return getCurCommentEditor;
        default: console.error("REDUCER EXCEPTION!");
    }
}


// Deprecated
/*
export function getCurEntityChannelId(etype: string) {
    return compose(fromEntities.getChannelId(),
        fromEntities.getCurEntity(), getEntitiesState(etype));
}
*/

export const getChannel = (posts: EntitiesState, id: number) => posts.entities[id].channel;
export const getCurPostChannel = createSelector(getPostsState, getCurPostId, getChannel);
export const getCurPageChannel = createSelector(getPagesState, getCurPageId, getChannel);
export const getCurDealChannel = createSelector(getDealsState, getCurDealId, getChannel);
export const getCurTopicChannel = createSelector(getTopicsState, getCurTopicId, getChannel);
export const getCurPlaceChannel = createSelector(getPlacesState, getCurPlaceId, getChannel);
export const getCurAdChannel = createSelector(getAdsState, getCurAdId, getChannel);
export const getCurEmailChannel = createSelector(getEmailsState, getCurEmailId, getChannel);
export const getCurAttachChannel = createSelector(getAttachsState, getCurAttachId, getChannel);
export const getCurCommentChannel = createSelector(getCommentsState, getCurCommentId, getChannel);
export function getCurEntityChannel(etype: string) {
    switch(etype) {
        case ENTITY.POST: return getCurPostChannel;
        case ENTITY.PAGE: return getCurPageChannel;
        case ENTITY.OFFER: return getCurDealChannel;
        case ENTITY.TOPIC: return getCurTopicChannel;
        case ENTITY.PLACE:     return getCurPlaceChannel;
        case ENTITY.ADVERTISE: return getCurAdChannel;
        case ENTITY.NEWSLETTER: return getCurEmailChannel;
        case ENTITY.ATTACHMENT: return getCurAttachChannel;
        case ENTITY.COMMENT: return getCurCommentChannel;
        default: console.error("REDUCER EXCEPTION!");
    }
}

export const getTopicType = (posts: EntitiesState, id: number) => posts.entities[id].type;
export const getCurPostTopicType = createSelector(getPostsState, getCurPostId, getTopicType);
export const getCurPageTopicType = createSelector(getPagesState, getCurPageId, getTopicType);
export const getCurDealTopicType = createSelector(getDealsState, getCurDealId, getTopicType);
export const getCurTopicTopicType = createSelector(getTopicsState, getCurTopicId, getTopicType);
export const getCurPlaceTopicType = createSelector(getPlacesState, getCurPlaceId, getTopicType);
export const getCurAdTopicType = createSelector(getAdsState, getCurAdId, getTopicType);
export const getCurEmailTopicType = createSelector(getEmailsState, getCurEmailId, getTopicType);
export const getCurAttachTopicType = createSelector(getAttachsState, getCurAttachId, getTopicType);
export const getCurCommentTopicType = createSelector(getCommentsState, getCurCommentId, getTopicType);
export function getCurEntityTopicType(etype: string) {
    switch(etype) {
        case ENTITY.POST: return getCurPostTopicType;
        case ENTITY.PAGE: return getCurPageTopicType;
        case ENTITY.OFFER: return getCurDealTopicType;
        case ENTITY.TOPIC: return getCurTopicTopicType;
        case ENTITY.PLACE:     return getCurPlaceTopicType;
        case ENTITY.ADVERTISE: return getCurAdTopicType;
        case ENTITY.NEWSLETTER: return getCurEmailTopicType;
        case ENTITY.ATTACHMENT: return getCurAttachTopicType;
        case ENTITY.COMMENT: return getCurCommentTopicType;
        default: console.error("REDUCER EXCEPTION!");
    }
}

export const getKeywordsAsArray = (posts: EntitiesState, id: number) => posts.entities[id].keywords.split(',');
export const getCurPostKeywordsAsArray = createSelector(getPostsState, getCurPostId, getKeywordsAsArray);
export const getCurPageKeywordsAsArray = createSelector(getPagesState, getCurPageId, getKeywordsAsArray);
export const getCurDealKeywordsAsArray = createSelector(getDealsState, getCurDealId, getKeywordsAsArray);
export const getCurTopicKeywordsAsArray = createSelector(getTopicsState, getCurTopicId, getKeywordsAsArray);
export const getCurPlaceKeywordsAsArray = createSelector(getPlacesState, getCurPlaceId, getKeywordsAsArray);
export const getCurAdKeywordsAsArray = createSelector(getAdsState, getCurAdId, getKeywordsAsArray);
export const getCurEmailKeywordsAsArray = createSelector(getEmailsState, getCurEmailId, getKeywordsAsArray);
export const getCurAttachKeywordsAsArray = createSelector(getAttachsState, getCurAttachId, getKeywordsAsArray);
export const getCurCommentKeywordsAsArray = createSelector(getCommentsState, getCurCommentId, getKeywordsAsArray);
export function getCurEntityKeywordsAsArray(etype: string) {
    switch(etype) {
        case ENTITY.POST: return getCurPostKeywordsAsArray;
        case ENTITY.PAGE: return getCurPageKeywordsAsArray;
        case ENTITY.OFFER: return getCurDealKeywordsAsArray;
        case ENTITY.TOPIC: return getCurTopicKeywordsAsArray;
        case ENTITY.PLACE:     return getCurPlaceKeywordsAsArray;
        case ENTITY.ADVERTISE: return getCurAdKeywordsAsArray;
        case ENTITY.NEWSLETTER: return getCurEmailKeywordsAsArray;
        case ENTITY.ATTACHMENT: return getCurAttachKeywordsAsArray;
        case ENTITY.COMMENT: return getCurCommentKeywordsAsArray;
        default: console.error("REDUCER EXCEPTION!");
    }
}


export const getIntro = (posts: EntitiesState, id: number) => posts.entities[id].intro;
export const getCurPostIntro = createSelector(getPostsState, getCurPostId, getIntro);
export const getCurPageIntro = createSelector(getPagesState, getCurPageId, getIntro);
export const getCurDealIntro = createSelector(getDealsState, getCurDealId, getIntro);
export const getCurTopicIntro = createSelector(getTopicsState, getCurTopicId, getIntro);
export const getCurPlaceIntro = createSelector(getPlacesState, getCurPlaceId, getIntro);
export const getCurAdIntro = createSelector(getAdsState, getCurAdId, getIntro);
export const getCurEmailIntro = createSelector(getEmailsState, getCurEmailId, getIntro);
export const getCurAttachIntro = createSelector(getAttachsState, getCurAttachId, getIntro);
export const getCurCommentIntro = createSelector(getCommentsState, getCurCommentId, getIntro);
export function getCurEntityIntro(etype: string) {
    switch(etype) {
        case ENTITY.POST: return getCurPostIntro;
        case ENTITY.PAGE: return getCurPageIntro;
        case ENTITY.OFFER: return getCurDealIntro;
        case ENTITY.TOPIC: return getCurTopicIntro;
        case ENTITY.PLACE:     return getCurPlaceIntro;
        case ENTITY.ADVERTISE: return getCurAdIntro;
        case ENTITY.NEWSLETTER: return getCurEmailIntro;
        case ENTITY.ATTACHMENT: return getCurAttachIntro;
        case ENTITY.COMMENT: return getCurCommentIntro;
        default: console.error("REDUCER EXCEPTION!");
    }
}

export const getContent = (posts: EntitiesState, id: number) => posts.entities[id].content;
export const getCurPostContent = createSelector(getPostsState, getCurPostId, getContent);
export const getCurPageContent = createSelector(getPagesState, getCurPageId, getContent);
export const getCurDealContent = createSelector(getDealsState, getCurDealId, getContent);
export const getCurTopicContent = createSelector(getTopicsState, getCurTopicId, getContent);
export const getCurPlaceContent = createSelector(getPlacesState, getCurPlaceId, getContent);
export const getCurAdContent = createSelector(getAdsState, getCurAdId, getContent);
export const getCurEmailContent = createSelector(getEmailsState, getCurEmailId, getContent);
export const getCurAttachContent = createSelector(getAttachsState, getCurAttachId, getContent);
export const getCurCommentContent = createSelector(getCommentsState, getCurCommentId, getContent);
export function getCurEntityContent(etype: string) {
    switch(etype) {
        case ENTITY.POST: return getCurPostContent;
        case ENTITY.PAGE: return getCurPageContent;
        case ENTITY.OFFER: return getCurDealContent;
        case ENTITY.TOPIC: return getCurTopicContent;
        case ENTITY.PLACE:     return getCurPlaceContent;
        case ENTITY.ADVERTISE: return getCurAdContent;
        case ENTITY.NEWSLETTER: return getCurEmailContent;
        case ENTITY.ATTACHMENT: return getCurAttachContent;
        case ENTITY.COMMENT: return getCurCommentContent;
        default: console.error("REDUCER EXCEPTION!");
    }
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

export const getAlert = (state: AppState) => state.alerts;
export const getPreference = (state: AppState) => state.pref;