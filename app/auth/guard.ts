/**
 * This guard the access to the dashboard
 */

import { Injectable }          from '@angular/core'
import { CanActivate, Router } from '@angular/router';
import { AuthService }         from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {
        if (this.authService.isLoggedIn) { return true; }
        this.router.navigate(['/login']);
        return false;
    }
}
