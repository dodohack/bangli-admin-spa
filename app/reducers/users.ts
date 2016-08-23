import { Action }     from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { User }         from '../models';
import { Paginator }   from '../models';
import { UserActions }  from '../actions';

export interface UsersState {
    uuids: string[];
    entities: User[];
    paginator: Paginator;
};

const initialState: UsersState = {
    uuids: [],
    entities: [],
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

        default:
            return state;
    }
}

/* FIXME: For current logged user, we can not get it from s.entities */
export function getUser(uuid: string) {
    return (state$: Observable<UsersState>) => state$
        .select(s => s.entities[uuid]);
}
