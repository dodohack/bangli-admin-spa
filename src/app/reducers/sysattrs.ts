import { Action }         from '@ngrx/store';
import { Observable }     from 'rxjs/Observable';

import { UserRole }       from '../models';
import * as sys           from '../actions/sysattr';


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

export default function (state = initState, action: sys.Actions | any): SysAttrsState {
    switch (action.type)
    {
        case sys.LOAD_ALL_SUCCESS: {
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
export const getUserRoles = (state: SysAttrsState) => state.roles;

/**
 * Return an array of thumbnail configs
 */
export const getThumbConfig = (state: SysAttrsState) => state.thumbs;
