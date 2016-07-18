/**
 * This is the register page for backend
 */

import { Component }         from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { NgForm }            from '@angular/forms';

import { AuthService }              from '../service/auth.service';
import { Register, RegisterError }  from '../datatype/register';
import { APP }                from '../app.api';

@Component({
    selector: 'register-form',
    templateUrl: 'app/auth/register.form.html',
    directives: [ROUTER_DIRECTIVES]
})
export class RegisterForm
{
    jwt: any;
    error = new RegisterError('', '', '');
    form  = new Register('', '', '', '', APP.register_callback);

    constructor(private router: Router,
                private authService: AuthService)
    {
        /* Redirect user if already logged in */
        if (this.authService.isLoggedIn)
            this.router.navigate(['/']);
    }

    /* Triggered when user clicks on submit button */
    onSubmit()
    {
        /* Reset the error message */
        this.error.reset();

        this.authService.postRegister(this.form).subscribe(
                data  => {
                    this.jwt = data['token'];
                },
                error => {
                    error['name'] ? this.error['name'] = error['name'] : false;
                    error['email'] ? this.error['email'] = error['email'] : false;
                    error['password'] ? this.error['password'] = error['password'] : false;
                    //console.error(error);
                },
                ()    => {
                    /* Login user in when everything is ok */
                    this.authService.login(this.jwt);
                }
            );
    }
}