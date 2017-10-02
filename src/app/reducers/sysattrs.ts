import { Action }         from '@ngrx/store';
import { Observable }     from 'rxjs/Observable';

import { SysAttrActions } from '../actions';
import { UserRole }       from '../models';

export interface SysAttrsState {
    // Available user roles
    roles: UserRole[];
    // Available thumbnail configurations
    thumbs: any;
};

const initState: SysAttrsState = {
    roles: [],
    thumbs: null,
};

export default function (state = initState, action: Action): SysAttrsState {
    switch (action.type)
    {
        case SysAttrActions.LOAD_ALL_SUCCESS: {
            let payload = action.payload;

            let roles: UserRole[];
            if (payload.roles)  roles = payload.roles;

            let thumbs: any;
            if (payload.thumbs) thumbs = payload.thumbs;
            
            return {
                roles: [...roles],
                thumbs: [...thumbs],
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

/**
 * Return an array of thumbnail configs
 */
export function getThumbConfig() {
    return (state$: Observable<SysAttrsState>) => state$.select(s => s.thumbs);
}