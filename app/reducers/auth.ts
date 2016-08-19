/**
 * Authentication related reducer
 */
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action }     from '@ngrx/store';

import { AuthActions } from '../actions';
import { User }        from '../models';

export type UserState = User;
/* Create a empty user as initial state */
const initialState: UserState = new User;

export default function(state = initialState, action: Action): UserState {
    switch (action.type)
    {
        case AuthActions.LOGIN: {
            return Object.assign({}, action.payload, {
                loginSuccess: false
            });
        }

        case AuthActions.LOGIN_SUCCESS: {
            console.log("Auth reducer: login success action: ", action);
            return Object.assign({}, action.payload, {
                loginSuccess: true
            });
        }

        case AuthActions.LOGIN_FAIL: {
            console.log("Auth reducer: login failed action: ", action);
            return Object.assign({}, action.payload, {
                loginSuccess: false
            });
        }

        case AuthActions.REGISTER:
            return action.payload;

        case AuthActions.REGISTER_COMPLETE:
            return action.payload;

        case AuthActions.REGISTER_SUCCESS:
            return action.payload;

        case AuthActions.REGISTER_FAIL:
            return action.payload;

        default:
            return state;
    }
}

export function isUserLoggedIn() {
    return (state$: Observable<UserState>) => 
        state$.select(user => user.token);
}