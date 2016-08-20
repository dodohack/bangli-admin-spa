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

export type UserState = User;
/* Create a empty user as initial state */
const initialState: UserState = new User;

export default function(state = initialState, action: Action): UserState {
    switch (action.type)
    {
        case AuthActions.INIT: {
            return state;
        }
            
        case AuthActions.LOGIN: {
            return Object.assign({}, action.payload);
        }

        case AuthActions.LOGIN_SUCCESS: {
            return Object.assign({}, action.payload, {
                payload: jwtDecode(action.payload.token), // JWT payload
                domain_key: action.payload.domains[0].key
            });
        }
            
        case AuthActions.LOGIN_FAIL: {
            return Object.assign({}, action.payload);
        }
            
        case AuthActions.LOGOUT: {
            return Object.assign({}, action.payload);
        }

        case AuthActions.REGISTER:
            return action.payload;

        case AuthActions.REGISTER_COMPLETE:
            return action.payload;

        case AuthActions.REGISTER_SUCCESS:
            return action.payload;

        case AuthActions.REGISTER_FAIL:
            return action.payload;

        case AuthActions.SWITCH_DOMAIN:
            return Object.assign({}, state, {
                domain_key: action.payload
            });

        default: // Return initial state
            return state;
    }
}

export function isUserLoggedIn() {
    return (state$: Observable<UserState>) => 
        state$.select(user => user.token);
}