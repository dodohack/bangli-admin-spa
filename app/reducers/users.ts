import { Action }     from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { User }         from '../models';
import { UserActions }  from '../actions';

export interface UsersState {
    ids: string[];
    entities: { [id: string]: User };
};

const initialState: UsersState = {
    ids: [],
    entities: {}
};

export default function (state = initialState, action: Action): UsersState {
    switch (action.type)
    {
        case UserActions.SEARCH_COMPLETE:
        case UserActions.LOAD_USERS_SUCCESS: {
            return;
        }


        default:
            return state;
    }
}

export function getUser(uuid: string) {
    return (state$: Observable<UsersState>) => state$
        .select(s => s.entities[uuid]);
}