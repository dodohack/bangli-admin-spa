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
import ordersReducer, * as fromOrders     from './orders';
import vouchersReducer, * as fromVouchers from './vouchers';
import newslettersReducer, * as fromNewsletters from './newsletters';
import postsReducer, * as fromPosts       from './posts';
import topicsReducer, * as fromTopics     from './topics';
import pagesReducer, * as fromPages       from './pages';
import dealPostsReducer, * as fromDealPosts   from './posts';
import dealTopicsReducer, * as fromDealTopics from './topics';
import cmsReducer, * as fromCms           from './cmsattrs';
import shopReducer, * as fromShop         from './shopattrs';
import {Observable} from "rxjs/Observable";

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface AppState {
    alerts:   fromAlerts.AlertsState;
    auth:     fromAuth.AuthState;
    users:    fromUsers.UsersState;
    pref:     fromPref.PreferenceState;
    products: fromProducts.ProductsState;
    orders:   fromOrders.OrdersState;
    vouchers: fromVouchers.VouchersState;
    newsletters: fromNewsletters.NewsletterState;
    posts:    fromPosts.PostsState;
    topics:   fromTopics.TopicsState;
    pages:    fromPages.PagesState;
    dealPosts:  fromDealPosts.PostsState;
    dealTopics: fromDealTopics.TopicsState;
    cms:      fromCms.CmsAttrsState;
    shop:     fromShop.ShopAttrsState;
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
    localStorageSync(['auth', 'pref', 'cms'], true),
    combineReducers
)
({
    alerts:   alertsReducer,
    auth:     authReducer,
    users:    usersReducer,
    pref:     prefReducer,
    products: productsReducer,
    orders:   ordersReducer,
    vouchers: vouchersReducer,
    newsletters: newslettersReducer,
    posts:    postsReducer,
    topics:   topicsReducer,
    pages:    pagesReducer,
    dealPosts:  dealPostsReducer,
    dealTopics: dealTopicsReducer,
    cms:      cmsReducer,
    shop:     shopReducer
});

/*****************************************************************************
 * Auth
 *****************************************************************************/

/* Get AuthState from current AppState */
export function getAuthState() {
    return (state$: Observable<AppState>) =>
        state$.select(s => s.auth);
}
export function getAuthToken() {
    return fromAuth.getAuthToken();
}

export function isDashboardUser() {
    return compose(fromAuth.isDashboardUser(), getAuthState());
}

export function hasAuthorRole() {
    return compose(fromAuth.hasAuthorRole(), getAuthState());
}

export function hasEditorRole() {
    return compose(fromAuth.hasEditorRole(), getAuthState());
}

export function hasShopManagerRole() {
    return compose(fromAuth.hasShopManagerRole(), getAuthState());
}

export function hasAdminRole() {
    return compose(fromAuth.hasAdminRole(), getAuthState());
}

export function hasSuperUserRole() {
    return compose(fromAuth.hasSuperUserRole(), getAuthState());
}

/*****************************************************************************
 * User
 *****************************************************************************/
export function getUsersState() {
    return (state$: Observable<AppState>) =>
        state$.select(s => s.users);
}

/* FIXME: */
export function getUsers(filter: any) {
    return getUsersState();
}

export function getUser(uuid: string) {
    return compose(fromUsers.getUser(uuid), getUsersState());
}

/*****************************************************************************
 * Product
 *****************************************************************************/
export function getProductsState() {
    return (state$: Observable<AppState>) =>
        state$.select(s => s.products);
}

export function getProduct(id: number) {
    return compose(fromProducts.getProduct(id), getProductsState());
}


/*****************************************************************************
 * Post
 *****************************************************************************/
export function getPostsState() {
    return (state$: Observable<AppState>) =>
        state$.select(s => s.posts);
}

export function getPost(id: number) {
    return compose(fromPosts.getPost(id), getPostsState());
}

export function isPostLocked() {
    
}


/*****************************************************************************
 * Topic
 *****************************************************************************/
export function getTopicsState() {
    return (state$: Observable<AppState>) =>
        state$.select(s => s.topics);
}

export function getTopic(id: number) {
    return compose(fromTopics.getTopic(id), getTopicsState());
}


/*****************************************************************************
 * Page
 *****************************************************************************/
/*
export function getPagesState() {
    return (state$: Observable<AppState>) =>
        state$.select(s => s.pages);
}

export function getPage(id: number) {
    return compose(fromPages.getPage(id), getPagesState());
}
*/