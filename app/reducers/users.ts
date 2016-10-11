import { Action }     from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { User }        from '../models';
import { Paginator }   from '../models';
import { UserActions } from '../actions';

export interface UsersState {
    ids: number[];
    idsEditing: number[];
    entities: { [id: number]: User };
    isLoading: boolean;
    paginator: Paginator;
};

const initialState: UsersState = {
    ids: [],
    idsEditing: [],
    entities: {},
    isLoading: true,
    paginator: null
};

export default function (state = initialState, action: Action): UsersState {
    switch (action.type)
    {
        case UserActions.LOAD_USER:
        case UserActions.LOAD_USERS: {
            return Object.assign({}, state, {isLoading: true});
        }

        case UserActions.SEARCH_COMPLETE:
        case UserActions.LOAD_USERS_SUCCESS: {

            const users     = action.payload.users;
            const ids       = users.map(user => user.id);
            const entities  = users.reduce(
                (entities: { [id: number]: User }, user: User) => {
                   return Object.assign(entities, { [user.id]: user });
                }, {});

            return Object.assign({}, state, {
                ids:        ids,
                idsEditing: [],
                entities:   entities,
                isLoading:  false,
                paginator:  action.payload.paginator
            });
        }

        // TODO: We should have an action to load user credential from auth
        // server.

        // User load successfully from application server
        case UserActions.LOAD_USER_SUCCESS: {
            const id  = action.payload.id;
            const ids = (state.ids.indexOf(id) === -1) ?
                [...state.ids, id] : state.ids;

            return Object.assign({}, state, {
                ids:        ids,
                idsEditing: [id],
                entities:   Object.assign({},
                    state.entities, { [id]: action.payload }),
                isLoading:  false
            });
        }

        // This action is returned from auth server, so we got uuid instead of id
        case UserActions.LOAD_USER_DOMAINS_SUCCESS: {
            const uuid = action.payload.uuid;

            let newUser;
            // Update the user with retrieved domains info
            for (let id in state.ids) {
                if (state.entities[id].uuid === uuid) {
                    newUser = Object.assign({}, state.entities[id],
                        {domains: action.payload.domains});
                    break;
                }
            }

            if (newUser) {
                return Object.assign({}, state, {
                    entities: Object.assign({},
                        state.entities, {[newUser.id]: newUser})
                });
            }
        }

        default:
            return state;
    }
}

/* FIXME: For current logged user, we can not get it from s.entities */
export function getUser(id: number) {
    return (state$: Observable<UsersState>) => state$
        .select(s => s.entities[id]);
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
        .map(s => s.ids.map(id => s.entities[id]));
}

export function getUserIds() {
    return (state$: Observable<UsersState>) => state$.select(s => s.ids);
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
