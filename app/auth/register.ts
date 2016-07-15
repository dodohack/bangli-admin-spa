/**
 * This is the register page for backend
 */

import { Component }         from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { RegisterForm }      from './register.form';

@Component({
    templateUrl: 'app/auth/register.html',
    directives: [ROUTER_DIRECTIVES, RegisterForm]
})
export class RegisterPage
{
}