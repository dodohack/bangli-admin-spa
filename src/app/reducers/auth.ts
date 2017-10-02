/**
 * Authentication related reducer
 */
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action }     from '@ngrx/store';

import { Domain }      from '../models';
import { JwtPayload }  from '../models';
import { User }        from '../models';
import * as auth       from '../actions/auth';


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
    // Current managing domain corresponding image server url
    img_server: string;
    // Domain keys array
    keys: string[];
    // Available domains to current user
    domains: { [key: string]: Domain };
    // Domain connectivity
    latencies: latencyType;
    // Domain specific user info, index by domain key
    users: { [key: string]: User };
}

const initialState: AuthState = {
    failure: true,
    token: undefined,
    jwt: new JwtPayload,
    key: undefined,
    img_server: undefined,
    keys: [],
    domains: {},
    latencies: {},
    users: {}
};

export function authReducer(state = initialState, action: auth.Actions | any): AuthState {
    switch (action.type)
    {
        case auth.LOGIN_SUCCESS: {
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
                img_server: undefined,
                keys: [...keys],
                domains: Object.assign({}, domainEntities),
                latencies: latencyEntities,
                users: state.users
            };
        }

        // Set the latencies start to current msecond for all domains
        // and set end to the same as start, so we got the latency by doing
        // end - start
        case auth.PING_DOMAINS: {
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
        case auth.PING_DOMAIN_SUCCESS: {

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

        case auth.LOGIN_DOMAIN: {
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

        case auth.LOGIN_DOMAIN_SUCCESS: {
            const user = { [state.key]: action.payload.user };
            // Append domain specific user profile to state.users
            return Object.assign({}, state, {
                failure:    false,
                img_server: action.payload.img_server,
                users:      Object.assign({}, state.users, user)
            });
        }

        // Clear state if any failures or logout
        case auth.LOGIN_FAIL:
        case auth.LOGIN_FAIL_NO_DOMAIN:
        case auth.LOGIN_DOMAIN_FAIL:
        case auth.LOGIN_DOMAIN_FAIL_NO_PERMISSION:
        case auth.LOGOUT: {
            return initialState;
        }

        default: // Return initial state
            return state;
    }
}

/*****************************************************************************
 * These following reducer functions can't be used without selecting AuthState
 * from AppState in reducers/index.ts
 *****************************************************************************/

export const getAuthToken = (state: AuthState) => state.token;

export const getAuthJwt = (state: AuthState) => state.jwt;

export const getAuthFail = (state: AuthState) => state.failure;

export const getDomainKeys = (state: AuthState) => state.keys;

export const getDomains = (state: AuthState) => state.domains;

export const getDomainLatencies = (state: AuthState) => state.latencies;

export const getProfiles = (state: AuthState) => state.users;

export const getCurDomainKey = (state: AuthState) => state.key;

export const getCurDomain = (state: AuthState) => state.domains[state.key];

/**
 * If user profile of current domain is loaded(via AuthActions.loginDomain)
 */
export const hasCurProfile = (state: AuthState) => typeof state.users[state.key] != 'undefined';

/**
 * Get user profile of current domain
 */
export const getCurProfile = (state: AuthState) => state.users[state.key];

/**
 * Get current user id of current domain
 */
export const getMyId = (state: AuthState) => hasCurProfile(state) && state.users[state.key].id;

/**
 * Get user role of current domain
 */
export const getMyRoleName = (state: AuthState) => state.users[state.key].role.name;

/**
 * Check if current user has given role in 'name'
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
                return name === 'author' || name === 'editor' || name === 'shop_manager';
            case 'editor':
                return name === 'author' || name === 'editor';
            case 'author':
                return name === 'author';
        }

        return false;
    });
}

/**
 * If user token is valid and can manage any domain
 */
export const isDashboardUser = (state: AuthState) => {
    let now = Math.floor(Date.now()/1000);
    if (state.jwt && state.jwt.exp > now && state.key)
        return true;
    return false;
};

export const hasAuthorRole = (state: AuthState) => {
    let now = Math.floor(Date.now()/1000);
    return (state.jwt && state.jwt.exp > now && state.key &&
    (state.users[state.key].role.name === 'author'         ||
    state.users[state.key].role.name === 'editor'         ||
    state.users[state.key].role.name === 'shop_manager'   ||
    state.users[state.key].role.name === 'administrator'  ||
    state.jwt.spu === 1));

};

export const hasEditorRole = (state: AuthState) => {
    let now = Math.floor(Date.now()/1000);
    return (state.jwt && state.jwt.exp > now && state.key &&
    (state.users[state.key].role.name === 'editor'        ||
    state.users[state.key].role.name === 'shop_manager'  ||
    state.users[state.key].role.name === 'administrator' ||
    state.jwt.spu === 1));
};

export const hasAdminRole = (state: AuthState) => {
    let now = Math.floor(Date.now()/1000);
    return (state.jwt && state.jwt.exp > now && state.key &&
    (state.users[state.key].role.name === 'administrator' ||
    state.jwt.spu === 1));
};

export const hasSuperUserRole = (state: AuthState) => {
    let now = Math.floor(Date.now()/1000);
    return (state.jwt && state.jwt.exp > now && state.key &&
    state.jwt.spu === 1);
};

