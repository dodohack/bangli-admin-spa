/**
 * This is the login page for backend
 */

import { Component }       from '@angular/core';
import { Router }          from '@angular/router';

import { AuthService }     from '../service';
import { Login }           from '../models';
import { API_END_POINTS }  from '../api';

let template = require('./login.html');
@Component({
    template: template
})
export class LoginPage
{
    error: string;
    form: Login;

    constructor(private router: Router,
                private authService: AuthService)
    {

        //this.form = new Login('', '');
        
        /* Redirect user if already logged in */
        if (this.authService.isLoggedIn)
            this.router.navigate(['/']);
    }

    /* Stage 1 user migration is always from huluwa.uk */
    get stage1MigrationUrl() {
        let API = API_END_POINTS['huluwa_uk'];
        return API.migrate_user_stage1;
    }

    /* Triggered when user clicks on submit button */
    onSubmit()
    {
        /* Reset error massage */
        this.error = '';
        /*
        this.authService.postLogin(this.form.stringify()).subscribe(
            data  => {
                // Validate server response and login user on success
                this.error = this.authService.login(data);
            },
            error => {
                // FIXME: Always return this error message
                this.error = "邮箱或密码错误!";
                //console.error(error['error']);
            }
        );
        */
    }
}