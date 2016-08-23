import { Action } from '@ngrx/store';
import { User }   from '../models';

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
    static loadUsers(users: User[]): Action {
        return {
            type: UserActions.LOAD_USERS,
            payload: users
        };
    }

    static LOAD_USERS_SUCCESS = '[User] Load Users Success';
    static loadUsersSuccess(users: User[]): Action {
        return {
            type: UserActions.LOAD_USERS_SUCCESS,
            payload: users
        };
    }

    static LOAD_USER = '[User] Load User';
    static loadUser(user: User): Action {
        return {
            type: UserActions.LOAD_USER,
            payload: user
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
    static loadUserFail(user: User): Action {
        return {
            type: UserActions.LOAD_USER_FAIL,
            payload: user
        };
    }

    static LOAD_DOMAINS = '[User] Load Domains';
    static loadDomains(user: User): Action {
        return {
            type: UserActions.LOAD_DOMAINS,
            payload: user
        };
    }

    static SAVE_DOMAINS = '[User] Save Domains';
    static saveDomains(user: User) {
        return {
            type: UserActions.SAVE_DOMAINS,
            payload: user
        };
    }

    static SAVE_DOMAINS_SUCCESS = '[User] Save Domains Success';
    static saveDomainsSuccess(user: User) {
        return {
            type: UserActions.SAVE_DOMAINS_SUCCESS,
            payload: user
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
}