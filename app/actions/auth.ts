/**
 * Redux actions definition for user login/register/refresh token etc.
 */
import { Action }     from '@ngrx/store';
import { User }       from '../models';

export class AuthActions {
    static LOGIN = '[Auth] Login';
    static login(user: User): Action {
        return {
            type: AuthActions.LOGIN,
            payload: user
        }
    }

    static LOGIN_SUCCESS = '[Auth] Login Success';
    static loginSuccess(user: User): Action {
        return {
            type: AuthActions.LOGIN_SUCCESS,
            payload: user
        };
    }

    static LOGIN_FAIL = '[Auth] Login Fail';
    static loginFail(): Action {
        return {
            type: AuthActions.LOGIN_FAIL
        };
    }

    static REGISTER = '[Auth] Register';
    static register(user: User): Action {
        return {
            type: AuthActions.REGISTER,
            payload: user
        };
    }

    static REGISTER_COMPLETE = '[Auth] Register Complete';
    static registerComplete(user: User): Action
    {
        return {
            type: AuthActions.REGISTER_COMPLETE,
            payload: user
        };
    }

    static REGISTER_SUCCESS = '[Auth] Register Success';
    registerSuccess(user: User): Action {
        return {
            type: AuthActions.REGISTER_SUCCESS,
            payload: user
        };
    }

    static REGISTER_FAIL = '[Auth] Register Fail';
    static registerFail(user: User): Action {
        return {
            type: AuthActions.REGISTER_FAIL,
            payload: user
        };
    }
}
