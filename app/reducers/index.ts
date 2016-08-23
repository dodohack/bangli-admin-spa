/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose }         from '@ngrx/core/compose';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';

/**
 * Syncing between ngrx/store and browser local storage
 */
import { localStorageSync } from 'ngrx-store-localstorage';

/**
 * storeLogger is a powerful metareducer that logs out each time we dispatch
 * an action.
 *
 * A metareducer wraps a reducer function and returns a new reducer function
 * with superpowers. They are handy for all sorts of tasks, including
 * logging, undo/redo, and more.
 */
import { storeLogger }     from 'ngrx-store-logger';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze }     from 'ngrx-store-freeze';

import alertsReducer, * as fromAlerts     from './alerts';
import authReducer, * as fromAuth         from './auth';
import usersReducer, * as fromUsers       from './users';
import prefReducer, * as fromPref         from './preference';
import productsReducer, * as fromProducts from './products';
import {Observable} from "rxjs/Observable";

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface AppState {
    alerts: fromAlerts.AlertsState;
    auth: fromAuth.UserState;
    users: fromUsers.UsersState;
    pref: fromPref.PreferenceState;
    products: fromProducts.ProductsState;
}


/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
export default compose(
    storeFreeze, storeLogger(),
    localStorageSync(['auth', 'pref'], true),
    combineReducers
)
({
    alerts: alertsReducer,
    auth: authReducer,
    users: usersReducer,
    pref: prefReducer,
    products: productsReducer
});

export function getUserToken() {
    return fromAuth.getUserToken();
}

export function getUsersState() {
    return (state$: Observable<AppState>) => state$
        .select(s => s.users);
}

export function getUser(uuid: string) {
    return compose(fromUsers.getUser(uuid), getUsersState());
}
