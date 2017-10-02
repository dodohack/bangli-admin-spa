import { Action }   from '@ngrx/store';
import { User }     from '../models';
import { AuthUser } from '../models';
import { Domain }   from '../models';

export class UserActions {
    static SEARCH = '[User] Search';
    static search(query: string): Action {
        return {
            type: UserActions.SEARCH,
            payload: query
        };
    }

    static SEARCH_COMPLETE = '[User] Search Complete';
    static searchComplete(results: User[]): Action {
        return {
            type: UserActions.SEARCH_COMPLETE,
            payload: results
        };
    }

    static LOAD_USERS = '[User] Load Users';
    static loadUsers(filters: any): Action {
        return {
            type: UserActions.LOAD_USERS,
            payload: filters
        };
    }

    static LOAD_USERS_SUCCESS = '[User] Load Users Success';
    static loadUsersSuccess(users: User[]): Action {
        return {
            type: UserActions.LOAD_USERS_SUCCESS,
            payload: users
        };
    }

    static LOAD_USERS_FAIL = '[User] Load Users Fail';
    static loadUsersFail(): Action {
        return {
            type: UserActions.LOAD_USERS_FAIL
        };
    }
    
    static LOAD_USERS_ON_SCROLL = '[User] Load Users On Scroll';
    static loadUsersOnScroll(filters: any): Action {
        return {
            type: UserActions.LOAD_USERS_ON_SCROLL,
            payload: filters
        };
    }

    static LOAD_USERS_ON_SCROLL_SUCCESS = '[User] Load Users On Scroll Success';
    static loadUsersOnScrollSuccess(users: User[]): Action {
        return {
            type: UserActions.LOAD_USERS_ON_SCROLL_SUCCESS,
            payload: users
        };
    }

    static LOAD_USERS_ON_SCROLL_FAIL = '[User] Load Users On Scroll Fail';
    static loadUsersOnScrollFail(): Action {
        return {
            type: UserActions.LOAD_USERS_ON_SCROLL_FAIL
        };
    }
    static LOAD_USER = '[User] Load User';
    static loadUser(uuid: string): Action {
        return {
            type: UserActions.LOAD_USER,
            payload: uuid
        };
    }
    
    static LOAD_USER_SUCCESS = '[User] Load User Success';
    static loadUserSuccess(user: User): Action {
        return {
            type: UserActions.LOAD_USER_SUCCESS,
            payload: user
        };
    }

    static LOAD_USER_FAIL = '[User] Load User Fail';
    static loadUserFail(): Action {
        return {
            type: UserActions.LOAD_USER_FAIL
        };
    }

    static LOAD_AUTH_USER = '[User] Load Auth User';
    static loadAuthUser(uuid: string): Action {
        return {
            type: UserActions.LOAD_AUTH_USER,
            payload: uuid
        };
    }

    static LOAD_AUTH_USER_SUCCESS = '[User] Load Auth User Success';
    static loadAuthUserSuccess(domains: Domain[], user: AuthUser): Action {
        return {
            type: UserActions.LOAD_AUTH_USER_SUCCESS,
            payload: {domains: domains, user: user}
        };
    }

    static LOAD_AUTH_USER_FAIL = '[User] Load Auth User Fail';
    static loadAuthUserFail(): Action {
        return {
            type: UserActions.LOAD_AUTH_USER_FAIL
        };
    }

    static SAVE_AUTH_USER = '[User] Save Auth User';
    static saveAuthUser(user: User) {
        return {
            type: UserActions.SAVE_AUTH_USER,
            payload: user
        };
    }

    static SAVE_AUTH_USER_SUCCESS = '[User] Save Auth User Success';
    static saveAuthUserSuccess(user: User) {
        return {
            type: UserActions.SAVE_AUTH_USER_SUCCESS,
            payload: user
        };
    }

    static SAVE_AUTH_USER_FAIL = '[User] Save Auth User Fail';
    static saveAuthUserFail() {
        return {
            type: UserActions.SAVE_AUTH_USER_FAIL
        };
    }

    static SAVE_USER = '[User] Save User';
    static saveUser(user: User) {
        return {
            type: UserActions.SAVE_USER,
            payload: user
        };
    }

    static SAVE_USER_SUCCESS = '[User] Save User Success';
    static saveUserSuccess(user: User) {
        return {
            type: UserActions.SAVE_USER_SUCCESS,
            payload: user
        };
    }

    static SAVE_USER_FAIL = '[User] Save User Fail';
    static saveUserFail() {
        return {
            type: UserActions.SAVE_USER_FAIL
        };
    }

    // Add or remove domain dashboard permission to a user
    static TOGGLE_DASHBOARD_PERMISSION = '[User] Toggle User Dashboard Perm';
    static toggleDashboardPermission(id: number) {
        return {
            type: UserActions.TOGGLE_DASHBOARD_PERMISSION,
            payload: id
        };
    }

    // Toggle a user's super user permission
    static TOGGLE_SUPER_USER = '[User] Toggle Super User Perm';
    static toggleSuperUser() {
        return { type: UserActions.TOGGLE_SUPER_USER };
    }
}