/**
 * This guard the access to the dashboard
 */

import { Injectable }          from '@angular/core'
import { CanActivate, Router } from '@angular/router';
import { Store }               from '@ngrx/store';
import { Observable }          from 'rxjs/Observable';

import { AppState }            from '../reducers';

/**
 * User is logged in and can use dashboard
 */
@Injectable()
export class BaseGuard implements CanActivate {

    token: string = '';
    auth$: Observable<any>;

    constructor(private store: Store<AppState>, 
                private router: Router) {
        this.auth$ = store.select('auth');
        this.auth$.subscribe(payload => this.token = payload.token);
    }

    canActivate() {
        /* TODO: Check if token is valid */
        /* Check if we have JWT token */
        if (this.token) { return true; }

        /* Redirect un-authenticated user to login page */
        this.router.navigate(['/login']);
        return false;
    }
}

/**
 * User has permission equal or larger than an author, not just an author
 */
@Injectable()
export class AuthorGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
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

    canActivate() {
        return true;
        //if (this.authService.isEditor) { return true; }
    }
}


/**
 * * User has permission equal or larger than an shop_manager
 */
@Injectable()
export class ShopMgrGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
        return true;
        //if (this.authService.isShopMgr) { return true; }
    }
}

/**
 * * User has permission equal or larger than an admin(single site)
 */
@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
        return true;
        //if (this.authService.isAdmin) { return true; }
    }
}

/**
 * * User has permission equal or larger than an admin(single site)
 */
@Injectable()
export class SuperUserGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
        return true;
        //if (this.authService.isSuperUser) { return true; }
    }
}
