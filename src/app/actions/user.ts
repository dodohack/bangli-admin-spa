import { Action }   from '@ngrx/store';
import { User }     from '../models';
import { AuthUser } from '../models';
import { Domain }   from '../models';

export const SEARCH = '[User] Search';
export const SEARCH_COMPLETE = '[User] Search Complete';
export const LOAD_USERS = '[User] Load Users';
export const LOAD_USERS_SUCCESS = '[User] Load Users Success';
export const LOAD_USERS_FAIL = '[User] Load Users Fail';
export const LOAD_USERS_ON_SCROLL = '[User] Load Users On Scroll';
export const LOAD_USERS_ON_SCROLL_SUCCESS = '[User] Load Users On Scroll Success';
export const LOAD_USERS_ON_SCROLL_FAIL = '[User] Load Users On Scroll Fail';
export const LOAD_USER = '[User] Load User';
export const LOAD_USER_SUCCESS = '[User] Load User Success';
export const LOAD_USER_FAIL = '[User] Load User Fail';
export const LOAD_AUTH_USER = '[User] Load Auth User';
export const LOAD_AUTH_USER_SUCCESS = '[User] Load Auth User Success';
export const LOAD_AUTH_USER_FAIL = '[User] Load Auth User Fail';
export const SAVE_AUTH_USER = '[User] Save Auth User';
export const SAVE_AUTH_USER_SUCCESS = '[User] Save Auth User Success';
export const SAVE_AUTH_USER_FAIL = '[User] Save Auth User Fail';
export const SAVE_USER = '[User] Save User';
export const SAVE_USER_SUCCESS = '[User] Save User Success';
export const SAVE_USER_FAIL = '[User] Save User Fail';
export const TOGGLE_DASHBOARD_PERMISSION = '[User] Toggle User Dashboard Perm';
export const TOGGLE_SUPER_USER = '[User] Toggle Super User Perm';

export class Search implements Action {
    readonly type = SEARCH;
    constructor(public payload: string) {}
}

export class SearchComplete implements Action {
    readonly type = SEARCH_COMPLETE;
    constructor(public payload: User[]) {}
}

export class LoadUsers implements Action {
    readonly type = LOAD_USERS;
    // Payload - filters
    constructor(public payload: any) {}
}

export class LoadUsersSuccess implements Action {
    readonly type = LOAD_USERS_SUCCESS;
    constructor(public payload: User[]) {}
}

export class LoadUsersFail implements Action {
    readonly type = LOAD_USERS_FAIL;
}

export class LoadUsersOnScroll implements Action {
    readonly type = LOAD_USERS_ON_SCROLL;
    // Payload: filters
    constructor(public payload: any) {}
}

export class LoadUsersOnScrollSuccess implements Action {
    readonly type = LOAD_USERS_ON_SCROLL_SUCCESS;
    constructor(public payload: User[]) {}
}

export class LoadUsersOnScrollFail implements Action {
    readonly type = LOAD_USERS_ON_SCROLL_FAIL;
}

export class LoadUser implements Action {
    readonly type = LOAD_USER;
    // Payload - user uuid
    constructor(public payload: string) {}
}

export class LoadUserSuccess implements Action {
    readonly type = LOAD_USER_SUCCESS;
    constructor(public payload: User) {}
}

export class LoadUserFail implements Action {
    readonly type = LOAD_USER_FAIL;
}

export class LoadAuthUser implements Action {
    readonly type = LOAD_AUTH_USER;
    // Payload - user uuid
    constructor(public payload: string) {}
}

export class LoadAuthUserSuccess implements Action {
    readonly type = LOAD_AUTH_USER_SUCCESS;
    constructor(public payload: {domains: Domain[], user: AuthUser}) {}
}

export class LoadAuthUserFail implements Action {
    readonly type = LOAD_AUTH_USER_FAIL;
}

export class SaveAuthUser implements Action {
    readonly type = SAVE_AUTH_USER;
    constructor(public payload: User) {}
}

export class SaveAuthUserSuccess implements Action {
    readonly type = SAVE_AUTH_USER_SUCCESS;
    constructor(public payload: User) {}
}

export class SaveAuthUserFail implements Action {
    readonly type = SAVE_AUTH_USER_FAIL;
}

export class SaveUser implements Action {
    readonly type = SAVE_USER;
    constructor(public payload: User) {}
}

export class SaveUserSuccess implements Action {
    readonly type = SAVE_USER_SUCCESS;
    constructor(public payload: User) {}
}

export class SaveUserFail implements Action {
    readonly type = SAVE_USER_FAIL;
}

// Add or remove domain dashboard permission to a user
export class ToggleDashboardPermission implements Action {
    readonly type = TOGGLE_DASHBOARD_PERMISSION;
    // Payload - user id
    constructor(public payload: number) {}
}

export class ToggleSuperUser implements Action {
    readonly type = TOGGLE_SUPER_USER;
}

export type Actions = Search
| SearchComplete
| LoadUsers
| LoadUsersSuccess
| LoadUsersFail
| LoadUsersOnScroll
| LoadUsersOnScrollSuccess
| LoadUsersOnScrollFail
| LoadUser
| LoadUserSuccess
| LoadUserFail
| LoadAuthUser
| LoadAuthUserSuccess
| LoadAuthUserFail
| SaveAuthUser
| SaveAuthUserSuccess
| SaveAuthUserFail
| SaveUser
| SaveUserSuccess
| SaveUserFail
| ToggleDashboardPermission
| ToggleSuperUser;


