/**
 * Redux actions definition for user login/register/refresh token etc.
 */
import { Action }     from '@ngrx/store';
import { User }       from '../models';

export class AuthActions {
    static INIT = '[Auth] Init';
    static init(): Action {
        return { type: AuthActions.INIT };
    }

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
        return { type: AuthActions.LOGIN_FAIL };
    }

    static LOGOUT = '[Auth] Logout';
    static logout(): Action {
        return { type: AuthActions.LOGOUT };
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

    /* Change current domain user managing, can we stall use same 'auth'??
     * YES, We can, but domain_key in sessionStorage has high priority!!
     * 1. Check if sessionStorage has domain_key, if it does, use it.
     * 2. Only check localStorage if 1 is not true.
     * 3. User role and permission of switched domain is also retrieved
     * NOTE: Cause we always has a default domain_key set with key 'auth'.
     * */
    static LOGIN_DOMAIN = '[Auth] Login Domain';
    static loginDomain(domain_key: string): Action {
        return {
            type: AuthActions.LOGIN_DOMAIN,
            payload: domain_key
        };
    }

    static LOGIN_DOMAIN_SUCCESS = '[Auth] Login Domain Success';
    static loginDomainSuccess(user: User): Action {
        return {
            type: AuthActions.LOGIN_DOMAIN_SUCCESS,
            payload: user
        };
    }

    static LOGIN_DOMAIN_FAIL = '[Auth] Login Domain Fail';
    static loginDomainFail(): Action {
        return {
            type: AuthActions.LOGIN_DOMAIN_FAIL
        };
    }
}
