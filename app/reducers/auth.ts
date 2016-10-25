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

class latencyType {
    [key: string]: {start: number, end: number, delta: number}
};

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
    // Domain connectivities
    latencies: latencyType;
    // Domain specific user info, index by domain key
    users: { [key: string]: User };
}

const initialState: AuthState = {
    failure: true,
    token: undefined,
    jwt: new JwtPayload,
    key: undefined,
    keys: [],
    domains: {},
    latencies: {},
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

            const latencyEntities = domains.reduce(
                (latencies: latencyType, domain: Domain) => {
                    return Object.assign(latencies, {
                        [domain.key]: {start: 0, end: 0, delta: 0} });
                }, {});

            return {
                failure: false,
                token: token,
                jwt: jwtDecode(token),
                key: keys[0],
                keys: [...keys],
                domains: Object.assign({}, domainEntities),
                latencies: latencyEntities,
                users: state.users
            };
        }

        // Set the latencies start to current msecond for all domains
        // and set end to the same as start, so we got the latency by doing
        // end - start
        case AuthActions.PING_DOMAINS: {
            let timestamp = Math.round(performance.now());

            const latencyEntities = state.keys.reduce(
                (latencies: latencyType, key: string) => {
                    let oldLatency = state.latencies[key];
                    return Object.assign(latencies, 
                        {[key]: { start: timestamp, end: timestamp,
                            delta: oldLatency.delta }});
            }, {});

            return Object.assign({}, state, {latencies: latencyEntities});
        }

        // Update latencies.'end' for given domain
        case AuthActions.PING_DOMAIN_SUCCESS: {

            // Network problem will trigger empty payload
            if (!action.payload) return state;

            let key = action.payload;
            let oldLatency = state.latencies[key];

            let timestamp = Math.round(performance.now());

            let latencies = Object.assign({}, state.latencies,
                {[key]: {start: oldLatency.start, end: timestamp,
                    delta: timestamp - oldLatency.start}});

            return Object.assign({}, state, {latencies: latencies});
        }

        case AuthActions.LOGIN_DOMAIN: {
            // Record latest domain key as the default key for next time app
            // start
            if (action.payload)
                return Object.assign({}, state, {
                    failure: true,
                    key: action.payload
                });
            else
                return Object.assign({}, state, {
                    failure: true,
                    key: state.keys[0]
                });
        }

        case AuthActions.LOGIN_DOMAIN_SUCCESS: {
            const user = { [state.key]: action.payload };
            // Append domain specific user profile to state.users
            return Object.assign({}, state, {
                failure: false,
                users: Object.assign({}, state.users, user)
            });
        }

        // Clear state if any failures or logout
        case AuthActions.LOGIN_FAIL:
        case AuthActions.LOGIN_FAIL_NO_DOMAIN:
        case AuthActions.LOGIN_DOMAIN_FAIL:
        case AuthActions.LOGIN_DOMAIN_FAIL_NO_PERMISSION:
        case AuthActions.LOGOUT: {
            return initialState;
        }

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

export function getAuthFail() {
    return (state$: Observable<AuthState>) => state$
        .map(auth => auth.failure); //.filter(f => f);
}

export function getDomainKeys() {
    return (state$: Observable<AuthState>) => state$
        .select(auth => auth.keys);
}

export function getDomains() {
    return (state$: Observable<AuthState>) => state$
        .select(auth => auth.domains);
}

export function getDomainLatencies() {
    return (state$: Observable<AuthState>) => state$
        .select(auth => auth.latencies);
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

/**
 * Get current user id of current domain
 */
export function getMyId() {
    return (state$: Observable<AuthState>) => state$
        .filter(auth => auth.users[auth.key] != undefined)
        .map(auth => auth.users[auth.key].id);
}

/**
 * Get user role of current domain
 */
export function getMyRoleName() {
    return (state$: Observable<AuthState>) => state$
        .map(auth => auth.users[auth.key].role.name);
}

/**
 * Check if currnet user has given role in 'name'
 */
export function hasRole(name: string) {
    return (state$: Observable<AuthState>) => state$.select(auth => {

        if (!auth.users[auth.key]) return false; // Sanity check if user logged in

        if (auth.jwt.spu === 1) return true;
        else if (name === 'super_user' && auth.jwt.spu !== 1) return false;

        switch (auth.users[auth.key].role.name) {
            case 'administrator':
                return true; // always true
            case 'shop_manager':
                if (name === 'author' || name === 'editor' || name === 'shop_manager')
                    return true;
                return false;
            case 'editor':
                if (name === 'author' || name === 'editor')
                    return true;
                return false;
            case 'author':
                if (name === 'author')
                    return true;
                return false;
        }

        return false;
    });
}

/**
 * If user token is valid and can manage any domain
 */
export function isDashboardUser() {
    return (state$: Observable<AuthState>) => state$.select(auth => {
        let now = Math.floor(Date.now()/1000);
        if (auth.jwt && auth.jwt.exp > now && auth.key)
            return true;
        return false;
    });
}

export function hasAuthorRole() {
    return (state$: Observable<AuthState>) => state$.select(auth => {
        let now = Math.floor(Date.now()/1000);
        if (auth.jwt && auth.jwt.exp > now && auth.key &&
            (auth.users[auth.key].role.name === 'author'         ||
             auth.users[auth.key].role.name === 'editor'         ||
             auth.users[auth.key].role.name === 'shop_manager'   ||
             auth.users[auth.key].role.name === 'administrator'  ||
             auth.jwt.spu === 1)) {
            return true;
        }
        return false;
    });
}

export function hasEditorRole() {
    return (state$: Observable<AuthState>) => state$.select(auth => {
        let now = Math.floor(Date.now()/1000);
        if (auth.jwt && auth.jwt.exp > now && auth.key &&
            (auth.users[auth.key].role.name === 'editor'        ||
             auth.users[auth.key].role.name === 'shop_manager'  ||
             auth.users[auth.key].role.name === 'administrator' ||
             auth.jwt.spu === 1))
            return true;
        return false;
    });
}

export function hasShopManagerRole() {
    return (state$: Observable<AuthState>) => state$.select(auth => {
        let now = Math.floor(Date.now()/1000);
        if (auth.jwt && auth.jwt.exp > now && auth.key &&
            (auth.users[auth.key].role.name === 'shop_manager'  ||
             auth.users[auth.key].role.name === 'administrator' ||
             auth.jwt.spu === 1))
            return true;
        return false;
    });
}

export function hasAdminRole() {
    return (state$: Observable<AuthState>) => state$.select(auth => {
        let now = Math.floor(Date.now()/1000);
        if (auth.jwt && auth.jwt.exp > now && auth.key &&
            (auth.users[auth.key].role.name === 'administrator' || auth.jwt.spu === 1))
            return true;
        return false;
    });
}

export function hasSuperUserRole() {
    return (state$: Observable<AuthState>) => state$.select(auth => {
        let now = Math.floor(Date.now()/1000);
        if (auth.jwt && auth.jwt.exp > now && auth.key &&
            auth.jwt.spu === 1)
            return true;
        return false;
    });
}
