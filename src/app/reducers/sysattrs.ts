import { Action }         from '@ngrx/store';
import { Observable }     from 'rxjs/Observable';

import { UserRole }       from '../models';
import * as sys           from '../actions/sysattr';


export interface SysAttrsState {
    // Available user roles
    roles: UserRole[];
    // Available thumbnail configurations
    thumbs: any;
    // Available advertisement positions
    positions: any;
};

const initState: SysAttrsState = {
    roles: [],
    thumbs: null,
    positions: null,
};

export function sysReducer(state = initState, action: sys.Actions | any): SysAttrsState {
    switch (action.type)
    {
        case sys.LOAD_ALL_SUCCESS: {
            let payload = action.payload;

            let roles: UserRole[];
            if (payload.roles)  roles = payload.roles;

            let thumbs: any;
            if (payload.thumbs) thumbs = payload.thumbs;

            let positions: any;
            if (payload.positions) positions = payload.positions;

            return {
                roles: [...roles],
                thumbs: [...thumbs],
                positions: [...positions]
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


/**
 * Return an array of advertisement positions
 */
export const getPositions = (state: SysAttrsState) => state.positions;
