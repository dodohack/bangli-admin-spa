/**
 * This guard the access level to the dashboard
 */

import { Injectable }             from '@angular/core'
import { CanActivate, Router }    from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot }    from '@angular/router';
import { Store }                  from '@ngrx/store';
import { Observable }             from 'rxjs/Observable';

import { AppState }               from './reducers';
import { hasAuthorRole }          from './reducers';
import { hasEditorRole }          from './reducers';
import { hasShopManagerRole }     from './reducers';
import { hasAdminRole }           from './reducers';
import { hasSuperUserRole }       from './reducers';
//import { isPostLocked }           from './reducers';

/**
 * Only un-logged user can visit, such as login, register pages etc
 */
@Injectable()
export class UnauthGuard implements CanActivate {
    auth$: Observable<any>;

    constructor(private store: Store<AppState>,
                private router: Router) {
        this.auth$ = this.store.select('auth');
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot) {

        /* TODO: Check if token is valid */
        /* TODO: Reference ngrx-example-app book-exists.ts canActivate */
        /* NOTE: take(1) - only take one object from the observable stream */
        return this.auth$.take(1).map(payload => {
            if (payload.token) {
                this.router.navigate(['/dashboard']);
                return false;
            } else {
                return true;
            }
        });
    }
}


/**
 * User is logged in and can use dashboard
 */
@Injectable()
export class BaseGuard implements CanActivate {

    auth$: Observable<any>;

    constructor(private store: Store<AppState>, private router: Router) {
        this.auth$ = this.store.select('auth');
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        /* TODO: We can chain more Observables in */
        /* TODO: Check if token is valid */

        /* TODO: Reference ngrx-example-app book-exists.ts canActivate */
        /* NOTE: take(1) - must have, otherwise it doesn't work */
        return this.auth$.take(1).map(user => {
            if (user.token) {
                return true;
            } else {
                this.router.navigate(['/login']);
                return false;
            }
        });

        /* TODO: We could save state.url as redirect url after login */
    }
}

/* Author guard */
@Injectable()
export class AuthorGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.let<boolean>(hasAuthorRole()).take(1);
    }
}

/* Editor guard */
@Injectable()
export class EditorGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.let<boolean>(hasEditorRole()).take(1);
    }
}


/* Shop manager guard */
@Injectable()
export class ShopMgrGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.let<boolean>(hasShopManagerRole()).take(1);
    }
}

/* Admin guard */
@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.let<boolean>(hasAdminRole()).take(1);
    }
}

/* Super user guard */
@Injectable()
export class SuperUserGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.let<boolean>(hasSuperUserRole()).take(1);
    }
}

/* Post lock guard */
@Injectable()
export class LockGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log("LockGuard::canActivate route: ", route)
        return true;
    }
}

/* Post edit lock guard */
@Injectable()
export class EditLockGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log("EditLockGuard::canActivate route: ", route)
        //return this.store.let<boolean>(isPostLocked()).take(1);
        return true;
    }
}
