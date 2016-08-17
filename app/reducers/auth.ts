/**
 * Authentication related reducers
 */
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action }     from '@ngrx/store';

import { AuthActions } from '../actions';
/* FIXME: Merge Login, Register, User into single model??? */
import { User, Login } from '../models';

export type LoginState = Login;

const initialState: LoginState = {
    email: '',
    password: ''
};

export default function(state = initialState, action: Action): LoginState {
    switch (action.type)
    {
        case AuthActions.LOGIN:
            return action.payload;

        case AuthActions.LOGIN_COMPLETE:
            return action.payload;

        case AuthActions.REGISTER:
            return action.payload;

        default: {
            return state;
        }
    }
}