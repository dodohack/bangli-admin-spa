/**
 * Authentication related reducer
 */
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action }     from '@ngrx/store';

import { AuthActions } from '../actions';
import { Domain }      from '../models';
import { JwtPayload }  from '../models';
import { User }        from '../models';

var jwtDecode = require('jwt-decode');

export interface AuthState {
    // Global authentication info
    token: string;
    // Decoded JWT
    jwt:   JwtPayload;
    // Current managing domain
    key: string;
    // Only used to restore 'key' if loginDomain fails
    last_key: string;
    // Domain keys array
    keys: string[];
    // Available domains to current user
    domains: { [key: string]: Domain };
    // Domain specific info, index by domain key
    users: { [key: string]: User };
}

const initialState: AuthState = {
    token: '',
    jwt: new JwtPayload,
    key: '',
    last_key: '',
    keys: [],
    domains: {},
    users: {}
};

export default function(state = initialState, action: Action): AuthState {
    switch (action.type)
    {
        case AuthActions.LOGIN_SUCCESS: {
            const token: string     = action.payload.token;
            const domains: Domain[] = action.payload.domains;

            const keys: string[]    = domains.map(d => d.key);
            const domainEntities    = domains.reduce(
                (domains: { [key: string]: Domain }, domain: Domain) => {
                    return Object.assign(domains, { [domain.key]: domain });
                }, {});

            return {
                token: token,
                jwt: jwtDecode(token),
                key: keys[0],
                last_key: keys[0],
                keys: [...keys],
                domains: Object.assign({}, domainEntities),
                users: state.users
            };
        }
            
        case AuthActions.SWITCH_DOMAIN: {
            return Object.assign({},
                state, { key: action.payload, last_key: state.key });
        }

        case AuthActions.LOGIN_DOMAIN_SUCCESS: {
            const user = { [state.key]: action.payload };
            // Append domain specific user profile to state.users
            return Object.assign({},
                state, { users: Object.assign({}, state.users, user) });
        }

        case AuthActions.LOGIN_DOMAIN_FAIL: {
            // Reset auth.key to previous state
            return Object.assign({},
                state, { key: state.last_key, last_key: state.key });
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
    return (state$: Observable<AuthState>) => state$.select(auth => {
        let now = Math.floor(Date.now()/1000);
        if (auth.jwt && auth.jwt.exp > now && auth.jwt.dbu === 1)
            return true;
        return false;
    });
}

export function hasAuthorRole() {
    return (state$: Observable<AuthState>) => state$.select(auth => {
        let now = Math.floor(Date.now()/1000);
        if (auth.jwt && auth.jwt.exp > now && auth.jwt.dbu === 1 &&
            (auth.users[auth.key].name === 'author'         ||
             auth.users[auth.key].name === 'editor'         ||
             auth.users[auth.key].name === 'shop_manager'   ||
             auth.users[auth.key].name === 'administrator'  ||
             auth.jwt.spu === 1)) {
            return true;
        }
        return false;
    });
}

export function hasEditorRole() {
    return (state$: Observable<AuthState>) => state$.select(auth => {
        let now = Math.floor(Date.now()/1000);
        if (auth.jwt && auth.jwt.exp > now && auth.jwt.dbu === 1 &&
            (auth.users[auth.key].name === 'editor'        ||
             auth.users[auth.key].name === 'shop_manager'  ||
             auth.users[auth.key].name === 'administrator' ||
             auth.jwt.spu === 1))
            return true;
        return false;
    });
}

export function hasShopManagerRole() {
    return (state$: Observable<AuthState>) => state$.select(auth => {
        let now = Math.floor(Date.now()/1000);
        if (auth.jwt && auth.jwt.exp > now && auth.jwt.dbu === 1 &&
            (auth.users[auth.key].name === 'shop_manager'  ||
             auth.users[auth.key].name === 'administrator' ||
             auth.jwt.spu === 1))
            return true;
        return false;
    });
}

export function hasAdminRole() {
    return (state$: Observable<AuthState>) => state$.select(auth => {
        let now = Math.floor(Date.now()/1000);
        if (auth.jwt && auth.jwt.exp > now && auth.jwt.dbu === 1 &&
            (auth.users[auth.key].name === 'administrator' || auth.jwt.spu === 1))
            return true;
        return false;
    });
}

export function hasSuperUserRole() {
    return (state$: Observable<AuthState>) => state$.select(auth => {
        let now = Math.floor(Date.now()/1000);
        if (auth.jwt && auth.jwt.exp > now && auth.jwt.dbu === 1 &&
            auth.jwt.spu === 1)
            return true;
        return false;
    });
}
