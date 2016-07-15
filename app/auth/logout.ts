/**
 * Logout a user
 */

import { Component }         from '@angular/core';
import { AuthService }       from '../service/auth.service';

@Component({
    template: ''
})
export class LogoutComponent
{
    constructor(private authService: AuthService) {
        /* Logout user */
        authService.logout();
    }
}