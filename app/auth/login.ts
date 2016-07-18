/**
 * This is the login page for backend
 */

import { Component }         from '@angular/core';

import { LoginForm }      from './login.form';

@Component({
    templateUrl: 'app/auth/login.html',
    directives: [LoginForm]
})
export class LoginPage
{
}
