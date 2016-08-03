/**
 * This is the register page for backend
 */

import { Component }         from '@angular/core';
import { Router }            from '@angular/router';

import { AuthService }              from '../service';
import { Register, RegisterError }  from '../models';
import { Api }                      from '../api';

let template = require('./register.html');
@Component({
    template: template
})
export class RegisterPage
{
    /* API server endpoint of current domain */
    API: any;
    
    jwt: any;
    error: RegisterError;
    form: Register;

    constructor(private router: Router,
                private authService: AuthService)
    {
        this.API  = Api.getEndPoint();
        
        this.error = new RegisterError('', '', '');
        this.form = new Register('', '', '', '', this.API.register_callback);
        
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