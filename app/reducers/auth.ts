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
    // A generic failure status
    failure: boolean;

    // Global authentication info
    token: string;
    // Decoded JWT
    jwt:   JwtPayload;
    // Current managing domain
    key: string;
    // Domain keys array
    keys: string[];
    // Available domains to current user
    domains: { [key: string]: Domain };
    // Domain specific user info, index by domain key
    users: { [key: string]: User };
}

const initialState: AuthState = {
    failure: false,
    token: '',
    jwt: new JwtPayload,
    key: '',
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
                failure: false,
                token: token,
                jwt: jwtDecode(token),
                key: keys[0],
                keys: [...keys],
                domains: Object.assign({}, domainEntities),
                users: state.users
            };
        }

        case AuthActions.LOGIN_DOMAIN: {
            // Record latest domain key as the default key for next time app
            // start
            return Object.assign({}, state, { key: action.payload });
        }

        case AuthActions.LOGIN_DOMAIN_SUCCESS: {
            const user = { [state.key]: action.payload };
            // Append domain specific user profile to state.users
            return Object.assign({}, state,
                { failure: false, users: Object.assign({}, state.users, user) });
        }

        case AuthActions.LOGIN_DOMAIN_FAIL: {
            // Reset auth.key to default one
            return Object.assign({}, state, { failure: true, key: state.keys[0] });
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
    return (state$: Observable<AuthState>) => state$
        .select(auth => auth.token);
}

export function getAuthJwt() {
    return (state$: Observable<AuthState>) => state$
        .select(auth => auth.jwt);
}

export function hasAuthFail() {
    return (state$: Observable<AuthState>) => state$
        .map(auth => auth.failure).filter(f => f);
}

export function getDomainKeys() {
    return (state$: Observable<AuthState>) => state$
        .select(auth => auth.keys);
}

export function getDomains() {
    return (state$: Observable<AuthState>) => state$
        .select(auth => auth.domains);
}

export function getProfiles() {
    return (state$: Observable<AuthState>) => state$
        .select(auth => auth.users);
}

export function getCurDomainKey() {
    return (state$: Observable<AuthState>) => state$
        .select(auth => auth.key);
}

export function getCurDomain() {
    return (state$: Observable<AuthState>) => state$
        .map(auth => auth.domains[auth.key]);
}

/**
 * Get user profile of current domain
 */
export function getCurProfile() {
    return (state$: Observable<AuthState>) => state$
        .map(auth => auth.users[auth.key]);
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
