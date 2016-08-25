/**
 * Authentication related reducer
 */
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action }     from '@ngrx/store';

import { AuthActions } from '../actions';
import { User }        from '../models';

var jwtDecode = require('jwt-decode');

export type AuthState = User;
/* Create a empty user as initial state */
const initialState: AuthState = new User;

export default function(state = initialState, action: Action): AuthState {
    switch (action.type)
    {
        case AuthActions.LOGIN_SUCCESS: {
            return Object.assign({}, action.payload, {
                payload: jwtDecode(action.payload.token), // JWT payload
                domain_key: '' // Do not initial it, LOGIN_DOMAIN will do this
                //domain_key: action.payload.domains[0].key
            });
        }
            
        case AuthActions.LOGIN_FAIL: {
            return state;
        }

        case AuthActions.LOGOUT: {
            return initialState;
        }

        case AuthActions.REGISTER:
            return action.payload;

        case AuthActions.REGISTER_COMPLETE:
            return action.payload;

        case AuthActions.REGISTER_SUCCESS:
            return action.payload;

        case AuthActions.REGISTER_FAIL:
            return action.payload;

        case AuthActions.LOGIN_DOMAIN_SUCCESS:
            return Object.assign({}, 'x');
            /*
            return Object.assign({}, state, {
                domain_key: action.payload
            });
            */
        case AuthActions.LOGIN_DOMAIN_FAIL:
            return Object.assign({}, state, {
                domain_key: action.payload
            });

        case AuthActions.INIT:
        default: // Return initial state
            return state;
    }
}

/*****************************************************************************
 * These following reducer functions can't be used withour selecting AuthState
 * from AppState in reducers/index.ts
 *****************************************************************************/

export function getAuthToken() {
    return (state$: Observable<AuthState>) =>
        state$.select(user => user.token);
}

export function isDashboardUser() {
    return (state$: Observable<AuthState>) => state$.select(user => {
        let now = Math.floor(Date.now()/1000);
        if (user.payload && user.payload.exp > now && user.payload.dbu === 1)
            return true;
        return false;
    });
}

export function hasAuthorRole() {
    return (state$: Observable<AuthState>) => state$.select(user => {
        let now = Math.floor(Date.now()/1000);
        if (user.payload.exp > now && user.payload.dbu === 1 &&
            (user.role.name === 'author' ||
             user.role.name === 'editor'  ||
             user.role.name === 'shop_manager' ||
             user.role.name === 'administrator' ||
             user.payload.spu === 1))
            return true;
        return false;
    });
}

export function hasEditorRole() {
    return (state$: Observable<AuthState>) => state$.select(user => {
        let now = Math.floor(Date.now()/1000);
        if (user.payload.exp > now && user.payload.dbu === 1 &&
            (user.role.name === 'editor'  ||
             user.role.name === 'shop_manager' ||
             user.role.name === 'administrator' ||
             user.payload.spu === 1))
            return true;
        return false;
    });
}

export function hasShopManagerRole() {
    return (state$: Observable<AuthState>) => state$.select(user => {
        let now = Math.floor(Date.now()/1000);
        if (user.payload.exp > now && user.payload.dbu === 1 &&
            (user.role.name === 'shop_manager' ||
             user.role.name === 'administrator' ||
             user.payload.spu === 1))
            return true;
        return false;
    });
}

export function hasAdminRole() {
    return (state$: Observable<AuthState>) => state$.select(user => {
        let now = Math.floor(Date.now()/1000);
        if (user.payload.exp > now && user.payload.dbu === 1 &&
            (user.role.name === 'administrator' || user.payload.spu === 1))
            return true;
        return false;
    });
}

export function hasSuperUserRole() {
    return (state$: Observable<AuthState>) => state$.select(user => {
        let now = Math.floor(Date.now()/1000);
        if (user.payload.exp > now && user.payload.dbu === 1 &&
            user.payload.spu === 1)
            return true;
        return false;
    });
}
