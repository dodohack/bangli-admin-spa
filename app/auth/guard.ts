/**
 * This guard the access to the dashboard
 */

import { Injectable }          from '@angular/core'
import { CanActivate, Router } from '@angular/router';
import { AuthService }         from '../service/auth.service';

/**
 * User is logged in and can use dashboard
 */
@Injectable()
export class BaseGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {
        if (this.authService.isLoggedIn) { return true; }

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
    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {
        if (this.authService.isAuthor) { return true; }
    }
}

/**
 * * User has permission equal or larger than an editor, not just an editor
 */
@Injectable()
export class EditorGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {
        if (this.authService.isEditor) { return true; }
    }
}


/**
 * * User has permission equal or larger than an shop_manager
 */
@Injectable()
export class ShopMgrGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {
        if (this.authService.isShopMgr) { return true; }
    }
}

/**
 * * User has permission equal or larger than an admin(single site)
 */
@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {
        if (this.authService.isAdmin) { return true; }
    }
}

/**
 * * User has permission equal or larger than an admin(single site)
 */
@Injectable()
export class SuperUserGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {
        if (this.authService.isSuperUser) { return true; }
    }
}
