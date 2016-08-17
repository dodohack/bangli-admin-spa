import { Injectable } from '@angular/core';
import { Action }     from '@ngrx/store';

export class AuthActions {
    static LOGIN = '[Auth] Login';
    static login(user): Action {
        return {
            type: AuthActions.LOGIN,
            payload: user
        }
    }

    static LOGIN_COMPLETE = '[Auth] Login Complete';
    static loginComplete(user): Action {
        return {
            type: AuthActions.LOGIN_COMPLETE,
            payload: user
        };
    }

    static LOGIN_SUCCESS = '[Auth] Login Success';
    static loginSuccess(user): Action {
        return {
            type: AuthActions.LOGIN_SUCCESS,
            payload: user
        };
    }

    static LOGIN_FAIL = '[Auth] Login Fail';
    static loginFail(user): Action {
        return {
            type: AuthActions.LOGIN_FAIL,
            payload: user
        };
    }

    static REGISTER = '[Auth] Register';
    static register(user): Action {
        return {
            type: AuthActions.REGISTER,
            payload: user
        };
    }

    static REGISTER_COMPLETE = '[Auth] Register Complete';
    static registerComplete(user): Action
    {
        return {
            type: AuthActions.REGISTER_COMPLETE,
            payload: user
        };
    }

    static REGISTER_SUCCESS = '[Auth] Register Success';
    registerSuccess(user): Action {
        return {
            type: AuthActions.REGISTER_SUCCESS,
            payload: user
        };
    }

    static REGISTER_FAIL = '[Auth] Register Fail';
    static registerFail(user): Action {
        return {
            type: AuthActions.REGISTER_FAIL,
            payload: user
        };
    }

}