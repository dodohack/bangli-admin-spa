/**
 * This is the login page for backend
 */

import { Component }         from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { LoginForm }      from '../auth/login.form';

@Component({
    templateUrl: 'app/pages/login.html',
    directives: [ROUTER_DIRECTIVES, LoginForm]
})
export class LoginPage
{
}
