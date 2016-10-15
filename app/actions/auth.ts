/**
 * Redux actions definition for user login/register/refresh token etc.
 */
import { Action }     from '@ngrx/store';
import { User }       from '../models';
import { AuthUser }   from '../models';

export class AuthActions {
    static INIT = '[Auth] Init';
    static init(): Action {
        return { type: AuthActions.INIT };
    }

    static LOGIN = '[Auth] Login';
    static login(user: AuthUser): Action {
        return {
            type: AuthActions.LOGIN,
            payload: user
        }
    }

    static LOGIN_SUCCESS = '[Auth] Login Success';
    static loginSuccess(user: AuthUser): Action {
        return {
            type: AuthActions.LOGIN_SUCCESS,
            payload: user
        };
    }

    static LOGIN_FAIL = '[Auth] Login Fail';
    static loginFail(): Action {
        return { type: AuthActions.LOGIN_FAIL };
    }

    static LOGIN_FAIL_NO_DOMAIN = '[Auth] Login Fail No Domain';
    static loginFailNoDomain(): Action {
        return { type: AuthActions.LOGIN_FAIL_NO_DOMAIN };
    }

    static LOGOUT = '[Auth] Logout';
    static logout(): Action {
        return { type: AuthActions.LOGOUT };
    }

    static REGISTER = '[Auth] Register';
    static register(user: AuthUser): Action {
        return {
            type: AuthActions.REGISTER,
            payload: user
        };
    }

    static REGISTER_SUCCESS = '[Auth] Register Success';
    static registerSuccess(user: AuthUser): Action {
        return {
            type: AuthActions.REGISTER_SUCCESS,
            payload: user
        };
    }

    static REGISTER_FAIL = '[Auth] Register Fail';
    static registerFail(): Action {
        return { type: AuthActions.REGISTER_FAIL };
    }

    // Test domain connectivity
    static PING_DOMAINS = '[Auth] Ping Domains';
    static pingDomains(): Action {
        return { type: AuthActions.PING_DOMAINS };
    }

    static PING_DOMAIN_SUCCESS = '[Auth] Ping Domains Success';
    static pingDomainSuccess(key: string): Action {
        return {
            type: AuthActions.PING_DOMAIN_SUCCESS,
            payload: key
        };
    }

    static PING_DOMAIN_FAIL = '[Auth] Ping Domains Fail';
    static pingDomainFail(): Action {
        return { type: AuthActions.PING_DOMAIN_FAIL };
    }

    /* Login user into domain by auth.key if domain_key is not specified */
    static LOGIN_DOMAIN = '[Auth] Login Domain';
    static loginDomain(key: string = undefined): Action {
        return {
            type: AuthActions.LOGIN_DOMAIN,
            payload: key
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
        return { type: AuthActions.LOGIN_DOMAIN_FAIL };
    }

    static LOGIN_DOMAIN_FAIL_NO_PERMISSION = '[Auth] Login Domain Fail No Permission';
    static loginDomainFailNoPermission(): Action {
        return { type: AuthActions.LOGIN_DOMAIN_FAIL_NO_PERMISSION };
    }
}
