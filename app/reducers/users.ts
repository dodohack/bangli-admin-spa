import { Action }     from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { User }        from '../models';
import { AuthUser }    from '../models';
import { Domain }      from '../models';
import { Paginator }   from '../models';
import { UserActions } from '../actions';

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

export default function (state = initialState, action: Action): UsersState {
    switch (action.type)
    {
        case UserActions.LOAD_USER:
        case UserActions.LOAD_AUTH_USER:
        case UserActions.LOAD_USERS:
        case UserActions.LOAD_USERS_ON_SCROLL: {
            return Object.assign({}, state, {isLoading: true});
        }

        case UserActions.SEARCH_COMPLETE:
        case UserActions.LOAD_USERS_SUCCESS: {

            const usersAry  = action.payload.users;
            const uuids     = usersAry.map(user => user.uuid);
            const newUsers  = usersAry.reduce(
                (users: {[uuid: string]: User}, user: User) => {
                    return Object.assign(users, { [user.uuid]: { user: user } });
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
        case UserActions.LOAD_USERS_ON_SCROLL_SUCCESS: {
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
        case UserActions.LOAD_USER_SUCCESS: {
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

        // This action is returned from auth server, we have available domains
        // and user auth profile returned
        case UserActions.LOAD_AUTH_USER_SUCCESS: {
            const domains  = action.payload.domains;
            const authUser = action.payload.user;

            return Object.assign({}, state, {
                authUser:  authUser,
                domains:   domains,
                isLoading: false
            });

        }

        default:
            return state;
    }
}

/******************************************************************************
 * Helper functions
 ******************************************************************************/

/* FIXME: For current logged user, we can not get it from s.entities */
export function getUser(uuid: string) {
    return (state$: Observable<UsersState>) => state$
        .select(s => s.entities[uuid].user);
}

export function getAuthUser(uuid: string) {
    return (state$: Observable<UsersState>) => state$
        .select(s => s.entities[uuid].authUser);
}

export function getCurUser() {
    return (state$: Observable<UsersState>) => state$
        .map(s => s.entities[s.uuidsEditing[0]]);
}

/**
 * If the profile current in editing/viewing belongs to current loggedin user
 */
export function isProfile(uuid: string) {
    return (state$: Observable<UsersState>) => state$
        .map(s => s.uuidsEditing[0] === uuid);
}

/**
 * Get current page users in object
 */
export function getUsersObject() {
    return (state$: Observable<UsersState>) => state$.select(s => s.entities);
}

/**
 * Get current page users in array
 */
export function getUsers() {
    return (state$: Observable<UsersState>) => state$
        .map(s => s.uuids.map(uuid => s.entities[uuid]));
}

export function getUserIds() {
    return (state$: Observable<UsersState>) => state$.select(s => s.uuids);
}

/**
 * * Return if the single entity or entities list is in loading
 */
export function getIsUserLoading() {
    return (state$: Observable<UsersState>) => state$.select(s => s.isLoading);
}

export function getUserPaginator() {
    return (state$: Observable<UsersState>) => state$.select(s => s.paginator);
}

export function getAvailableDomains() {
    return (state$: Observable<UsersState>) => state$.select(s => s.domains);
}
