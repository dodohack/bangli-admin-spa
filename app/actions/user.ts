import { Action } from '@ngrx/store';
import { User }   from '../models';
import { Domain } from '../models';

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

    static LOAD_USER_DOMAINS = '[User] Load Domains';
    static loadUserDomains(uuid: string): Action {
        return {
            type: UserActions.LOAD_USER_DOMAINS,
            payload: uuid
        };
    }

    static LOAD_USER_DOMAINS_SUCCESS = '[User] Load Domains Success';
    static loadUserDomainsSuccess(domains: Domain[]): Action {
        return {
            type: UserActions.LOAD_USER_DOMAINS_SUCCESS,
            payload: domains
        };
    }

    static LOAD_USER_DOMAINS_FAIL = '[User] Load Domains Fail';
    static loadUserDomainsFail(): Action {
        return {
            type: UserActions.LOAD_USER_DOMAINS_FAIL
        };
    }

    static SAVE_USER_DOMAINS = '[User] Save Domains';
    static saveUserDomains(user: User) {
        return {
            type: UserActions.SAVE_USER_DOMAINS,
            payload: user
        };
    }

    static SAVE_USER_DOMAINS_SUCCESS = '[User] Save Domains Success';
    static saveUserDomainsSuccess(user: User) {
        return {
            type: UserActions.SAVE_USER_DOMAINS_SUCCESS,
            payload: user
        };
    }

    static SAVE_USER_DOMAINS_FAIL = '[User] Save Domains Fail';
    static saveUserDomainsFail() {
        return {
            type: UserActions.SAVE_USER_DOMAINS_FAIL
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
}