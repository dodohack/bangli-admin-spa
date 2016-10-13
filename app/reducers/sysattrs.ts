import { Action }         from '@ngrx/store';
import { Observable }     from 'rxjs/Observable';

import { SysAttrActions } from '../actions';
import { UserRole }       from '../models';

export interface SysAttrsState {
    roles: UserRole[];
};

const initState: SysAttrsState = {
    roles: [],
};

export default function (state = initState, action: Action): SysAttrsState {
    switch (action.type)
    {
        case SysAttrActions.LOAD_ALL_SUCCESS: {
            let payload = action.payload;

            let roles: UserRole[];
            if (payload.roles)
                roles = payload.roles;
            
            return {
                roles: [...roles],
            };
        }

        default:
            return state;
    }
}


/******************************************************************************
 * Helper functions
 *****************************************************************************/

/**
 * Return an array of user roles
 */
export function getUserRoles() {
    return (state$: Observable<SysAttrsState>) => state$.select(s => s.roles);
}
