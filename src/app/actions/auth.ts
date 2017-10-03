/**
 * Redux actions definition for user login/register/refresh token etc.
 */
import { Action }     from '@ngrx/store';
import { User }       from '../models';
import { AuthUser }   from '../models';

export const LOGIN         = '[Auth] Login';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAIL    = '[Auth] Login Fail';
export const LOGIN_FAIL_NO_DOMAIN  = '[Auth] Login Fail No Domain';
export const LOGOUT        = '[Auth] Logout';
export const LOGOUT_SUCCESS = '[Auth] Logout Success';
export const REGISTER      = '[Auth] Register';
export const REGISTER_SUCCESS      = '[Auth] Register Success';
export const REGISTER_FAIL         = '[Auth] Register Fail';
export const PING_DOMAINS  = '[Auth] Ping Domains';
export const PING_DOMAIN_SUCCESS   = '[Auth] Ping Domain Success';
export const PING_DOMAIN_FAIL      = '[Auth] Ping Domain Fail';
export const LOGIN_DOMAIN  = '[Auth] Login Domain';
export const LOGIN_DOMAIN_SUCCESS  = '[Auth] Login Domain Success';
export const LOGIN_DOMAIN_FAIL     = '[Auth] Login Domain Fail';
export const LOGIN_DOMAIN_FAIL_NO_PERMISSION = '[Auth] Login Domain Fail No Permission';

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: AuthUser) {}
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: AuthUser) {}
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;
}

export class LoginFailNoDomain implements Action {
    readonly type = LOGIN_FAIL_NO_DOMAIN;
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LogoutSuccess implements Action {
    readonly type = LOGOUT_SUCCESS;
}

export class Register implements Action {
    readonly type = REGISTER;
    constructor(public payload: AuthUser) {}
}

export class RegisterSuccess implements Action {
    readonly type = REGISTER_SUCCESS;
    constructor(public payload: AuthUser) {}
}

export class RegisterFail implements Action {
    readonly type = REGISTER_FAIL;
}

export class PingDomains implements Action {
    readonly type = PING_DOMAINS;
}

export class PingDomainSuccess implements Action {
    readonly type = PING_DOMAIN_SUCCESS;
    // Payload - domain index key
    constructor(public payload: string) {}
}

export class PingDomainFail implements Action {
    readonly type = PING_DOMAIN_FAIL;
}

export class LoginDomain implements Action {
    readonly type = LOGIN_DOMAIN;
    // Payload -domain index key
    constructor(public payload: string = undefined) {}
}

export class LoginDomainSuccess implements Action {
    readonly type = LOGIN_DOMAIN_SUCCESS;
    constructor(public payload: User) {}
}

export class LoginDomainFail implements Action {
    readonly type = LOGIN_DOMAIN_FAIL;
}

export class LoginDomainFailNoPermission implements Action {
    readonly type = LOGIN_DOMAIN_FAIL_NO_PERMISSION;
}

export type Actions = Login
    | LoginSuccess
    | LoginFail
    | LoginFailNoDomain
    | Logout
    | LogoutSuccess
    | Register
    | RegisterSuccess
    | RegisterFail
    | PingDomains
    | PingDomainSuccess
    | PingDomainFail
    | LoginDomain
    | LoginDomainSuccess
    | LoginDomainFail
    | LoginDomainFailNoPermission;
