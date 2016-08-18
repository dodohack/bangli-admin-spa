/**
 * Redux reducer - Authentication related reducer
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
/*
const initialState: UserState = {
    id: 0,
    uuid: '',
    name: '',
    email: '',
    password: ''
}
*/

export default function(state = initialState, action: Action): UserState {
    switch (action.type)
    {
        case AuthActions.LOGIN: {
            return Object.assign({}, action.payload, {
                logining: true
            });
        }

        case AuthActions.LOGIN_COMPLETE: {
            return Object.assign({}, action.payload, {
                logining: false
            });
        }

        case AuthActions.LOGIN_SUCCESS: {
            return Object.assign({}, action.payload, {
                logining: false,
                loginSuccess: true
            });
        }

        case AuthActions.LOGIN_FAIL: {
            return Object.assign({}, action.payload, {
                logining: false,
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