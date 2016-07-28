/**
 * This is the register page for backend
 */

import { Component }         from '@angular/core';
import { Router }            from '@angular/router';

import { AuthService }              from '../service/auth.service';
import { Register, RegisterError }  from '../datatype/register';
import { APP }                      from '../app.api';

let template = './register.html';
@Component({
    template: template
})
export class RegisterPage
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