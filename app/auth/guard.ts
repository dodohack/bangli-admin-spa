/**
 * This guard the access to the dashboard
 */

import { Injectable }             from '@angular/core'
import { CanActivate, Router }    from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot }    from '@angular/router';
import { Store }                  from '@ngrx/store';
import { Observable }             from 'rxjs/Observable';

import {AppState, getUserToken}   from '../reducers';


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

    constructor(private store: Store<AppState>,
                private router: Router) {
        this.auth$ = this.store.select('auth');
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot) {

        /* TODO: We can chain more Observables in */
        /* TODO: Check if token is valid */

        /* TODO: Reference ngrx-example-app book-exists.ts canActivate */
        /* NOTE: take(1) - only take one object from the observable stream */
        return this.auth$.take(1).map(payload => {
            if (payload.token) {
                return true;
            } else {
                this.router.navigate(['/login']);
                return false;
            }
        });

        /* TODO: We could save state.url as redirect url after login */
    }
}

/**
 * User has permission equal or larger than an author, not just an author
 */
@Injectable()
export class AuthorGuard implements CanActivate {
    constructor(private router: Router ) {}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot) {
        return true;
        //if (this.authService.isAuthor) { return true; }
    }
}

/**
 * * User has permission equal or larger than an editor, not just an editor
 */
@Injectable()
export class EditorGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot) {
        return true;
        //if (this.authService.isEditor) { return true; }
    }
}


/**
 * * User has permission equal or larger than an shop_manager
 */
@Injectable()
export class ShopMgrGuard implements CanActivate {
    constructor(private router: Router ) {}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot) {
        return true;
        //if (this.authService.isShopMgr) { return true; }
    }
}

/**
 * * User has permission equal or larger than an admin(single site)
 */
@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private router: Router ) {}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot) {
        return true;
        //if (this.authService.isAdmin) { return true; }
    }
}

/**
 * * User has permission equal or larger than an admin(single site)
 */
@Injectable()
export class SuperUserGuard implements CanActivate {
    constructor(private router: Router ) {}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot) {
        return true;
        //if (this.authService.isSuperUser) { return true; }
    }
}
