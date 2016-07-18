/**
 * This is the register page for backend
 */

import { Component }         from '@angular/core';

import { RegisterForm }      from './register.form';

@Component({
    templateUrl: 'app/auth/register.html',
    directives: [RegisterForm]
})
export class RegisterPage
{
}