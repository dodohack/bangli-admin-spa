/**
 * This is the register page for backend
 */

import { Component }         from '@angular/core';
import { Router }            from '@angular/router';

import { AuthService }       from '../service';
import { User }              from '../models';

let t = require('./register.html');
@Component({
    template: t
})
export class RegisterPage
{
    user: User;
    password_confirmation: string;

    constructor(private router: Router,
                /*private authService: AuthService*/)
    {
        /* Redirect user if already logged in */
        /*
        if (this.authService.isLoggedIn)
            this.router.navigate(['/']);
        */
    }

    /* Triggered when user clicks on submit button */
    onSubmit()
    {
        if (this.user.password != this.password_confirmation)
            console.error("Password mismatch");
        
        /* Reset the error message */
        /*
        this.error.reset();

        this.authService.postRegister(this.form.stringify()).subscribe(
                data  => {
                    this.authService.login(data);
                },
                error => {
                    error['name'] ? this.error['name'] = error['name'] : false;
                    error['email'] ? this.error['email'] = error['email'] : false;
                    error['password'] ? this.error['password'] = error['password'] : false;
                    //console.error(error);
                }
            );
       */
    }
}