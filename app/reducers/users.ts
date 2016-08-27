import { Action }     from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { User }        from '../models';
import { Paginator }   from '../models';
import { UserActions } from '../actions';

export interface UsersState {
    uuids: string[];
    entities: { [uuid: string]: User };
    paginator: Paginator;
};

const initialState: UsersState = {
    uuids: [],
    entities: {},
    paginator: new Paginator
};

export default function (state = initialState, action: Action): UsersState {
    switch (action.type)
    {
        case UserActions.SEARCH_COMPLETE:
        case UserActions.LOAD_USERS_SUCCESS: {

            const users: User[]   = action.payload.users;
            const uuids: string[] = users.map(user => user.uuid);
            const entities        = users.reduce(
                (entities: { [uuid: string]: User }, user: User) => {
                   return Object.assign(entities, { [user.uuid]: user });
                }, {});

            return {
                uuids: [...uuids],
                entities: Object.assign({}, entities),
                paginator: Object.assign({}, action.payload.paginator)
            };
        }
            
        case UserActions.LOAD_USER_SUCCESS: {
            // User uuid currently loaded
            const uuid: string = action.payload['uuid'];

            // Update user from users list with detailed info just loaded
            // 'entities' is updated, 'uuids' and 'paginator' remain the same
            if (state.uuids.indexOf(uuid) !== -1) {
                return {
                    uuids: [...state.uuids],
                    entities: Object.assign({}, state.entities, {[uuid]: action.payload}),
                    paginator: Object.assign({}, state.paginator)
                };
            } else {
                // Return single user with the UsersState
                return {
                    uuids: [uuid],
                    entities: Object.assign({}, {[uuid]: action.payload}),
                    // paginator should be empty
                    paginator: Object.assign({}, state.paginator)
                };
            }
        }

        case UserActions.LOAD_DOMAINS_SUCCESS: {
            const uuid: string = action.payload['uuid'];

            // Update the user with retrieved domains info
            if (state.uuids.indexOf(uuid) !== -1) {
                const user = Object.assign({}, state.entities[uuid],
                    {domains: action.payload['domains']});
                return {
                    uuids: [...state.uuids],
                    entities: Object.assign({}, state.entities, {[uuid]: user}),
                    paginator: Object.assign({}, state.paginator)
                };
            } else {
                console.error("***THIS SHOULD NOT HAPPEN: CAN NOT FIND CURRENT USER FROM USERS LIST***");
                return state;
            }
        }

        default:
            return state;
    }
}

/* FIXME: For current logged user, we can not get it from s.entities */
export function getUser(uuid: string) {
    return (state$: Observable<UsersState>) => state$
        .select(s => s.entities[uuid]);
}
