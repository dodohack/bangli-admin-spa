import { Action }     from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { User }        from '../models';
import { AuthUser }    from '../models';
import { Domain }      from '../models';
import { Paginator }   from '../models';
import * as user       from '../actions/user';

export interface UsersState {
    uuids: string[];
    uuidsEditing: string[];
    users:     { [uuid: string]: User };
    // Each time, we only have 1 auth user loaded in single user page
    authUser:  AuthUser;
    isLoading: boolean;
    paginator: Paginator;
    // Available domains for all users (get from bangli_auth.domains),
    // TODO: we should move this out from user state when we have a seperate
    // ngrx/store for authencation attributes???
    domains: Domain[];
};

const initialState: UsersState = {
    uuids: [],
    uuidsEditing: [],
    users: {},
    authUser:  null,
    isLoading: true,
    paginator: null,
    domains: []
};

export function usersReducer(state = initialState, action: user.Actions | any): UsersState {
    switch (action.type)
    {
        case user.LOAD_USER:
        case user.LOAD_AUTH_USER:
        case user.LOAD_USERS:
        case user.LOAD_USERS_ON_SCROLL: {
            return Object.assign({}, state, {isLoading: true});
        }

        case user.SEARCH_COMPLETE:
        case user.LOAD_USERS_SUCCESS: {

            const usersAry  = action.payload.users;
            const uuids     = usersAry.map(user => user.uuid);
            const newUsers  = usersAry.reduce(
                (users: {[uuid: string]: User}, user: User) => {
                    return Object.assign(users, { [user.uuid]: user });
                }, {});

            return Object.assign({}, state, {
                uuids:        uuids,
                uuidsEditing: [],
                users:        newUsers,
                isLoading:    false,
                paginator:    action.payload.paginator
            });
        }

        // Almost identical to previous case, but ids and entities are merged
        // instead of replaced
        case user.LOAD_USERS_ON_SCROLL_SUCCESS: {
            const usersAry  = action.payload.users;
            const uuids     = usersAry.map(user => user.uuid);
            const newUsers  = usersAry.reduce(
                (users: {[uuid: string]: User}, user: User) => {
                    return Object.assign(users, { [user.uuid]: user });
                }, {});

            return Object.assign({}, state, {
                uuids:       [...state.uuids, ...uuids],
                idsEditing:  [],
                users:       Object.assign({}, state.users, newUsers),
                isLoading:   false,
                paginator:   action.payload.paginator
            });
        }

        // User load successfully from application server
        case user.LOAD_USER_SUCCESS: {
            const user   = action.payload;
            const uuids  = (state.uuids.indexOf(user.uuid) === -1) ?
                [...state.uuids, user.uuid] : state.uuids;

            return Object.assign({}, state, {
                uuids:        uuids,
                uuidsEditing: [user.uuid],
                users:        Object.assign({}, state.users, {[user.uuid]: user}),
                isLoading:  false
            });
        }

        case user.SAVE_USER: {
            const user = action.payload;
            if (user.uuid === state.uuidsEditing[0]) {
                const users = Object.assign({}, state.users, {[user.uuid]: user});
                return Object.assign({}, state, {users: users});
            } else {
                return state;
            }
        }

        // This action is returned from auth server, we have available domains
        // and user auth profile returned
        case user.LOAD_AUTH_USER_SUCCESS: {
            const domainsAry  = action.payload.domains;
            const newDomains  = action.payload.user.domains.reduce(
                (domains: {[id: number]: boolean }, domain: Domain) => {
                    return Object.assign(domains, { [domain.id]: domain.dashboard_user });
            }, {});

            const authUser = Object.assign({}, action.payload.user, {domains: newDomains});

            return Object.assign({}, state, {
                authUser:  authUser,
                domains:   domainsAry,
                isLoading: false
            });
        }

        case user.SAVE_AUTH_USER: {
            return Object.assign({}, state, {authUser: action.payload});
        }

        case user.TOGGLE_DASHBOARD_PERMISSION: {
            const id      = action.payload;
            const domains = state.authUser.domains;

            // Default new dashboard permission
            let newPerm = 1;

            // User has dashboard permssion
            if (domains[id]) newPerm = 0;

            let newDomains = Object.assign({}, domains, { [id]: newPerm });

            return Object.assign({}, state, {
                authUser: Object.assign({}, state.authUser, {domains: newDomains})
            });
        }

        case user.TOGGLE_SUPER_USER: {
            const newPerm = state.authUser.super_user ? 0 : 1;
            const authUser = Object.assign({}, state.authUser, {super_user: newPerm});
            return Object.assign({}, state, { authUser: authUser });
        }

        default:
            return state;
    }
}

/******************************************************************************
 * Helper functions
 ******************************************************************************/

/* FIXME: For current logged user, we can not get it from s.users */
export const getUser = (state: UsersState, uuid: string) => state.users[uuid];

export const getAuthUser = (state: UsersState) => state.authUser;

export const getCurUserUuid = (state: UsersState) => state.uuidsEditing[0];

export const getCurUser = (state: UsersState) => state.users[state.uuidsEditing[0]];

/**
 * If the profile current in editing/viewing belongs to current loggedin user
 */
export const isMyProfile = (state: UsersState, uuid: string) => state.uuidsEditing[0] === uuid;

/**
 * Get current page users in object
 */
export const getUsersObject = (state: UsersState) => state.users;

/**
 * Get current page users in array
 */
export const getUsers = (state: UsersState) => state.uuids.map(uuid => state.users[uuid]);

export const getUserIds = (state: UsersState) => state.uuids;

/**
 * * Return if the single entity or entities list is in loading
 */
export const getIsUserLoading = (state: UsersState) => state.isLoading;

export const getUserPaginator = (state: UsersState) => state.paginator;

export const getAvailableDomains = (state: UsersState) => state.domains;
