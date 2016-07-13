/**
 * This is the login page for backend
 */

import { Component }         from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { NgForm }            from '@angular/forms';

import { AuthService } from '../service/auth.service';

import { Login } from './login';
import { APP }   from '../app.api';

@Component({
    selector: 'login-form',
    templateUrl: 'app/auth/login.form.html',
    directives: [ROUTER_DIRECTIVES]
})
export class LoginForm
{
    jwt: any;
    error = '';
    model = new Login('', '');
    stage1_migration_url = APP.migrate_user_stage1;

    constructor(private router: Router,
                private authService: AuthService)
    {
        /* Redirect user if already logged in */
        if (this.authService.isLoggedIn())
            this.router.navigate(['/']);
    }

    /* Triggered when user clicks on submit button */
    onSubmit()
    {
        /* Reset error massage */
        this.error = '';

        this.authService.postLogin(this.model).subscribe(
            data  => {
                this.jwt = data['token'];
            },
            error => {
                /** FIXME: Always return this error message,
                 * server will return 404 and 422(email address invalid) error code
                 */
                this.error = "邮箱或密码错误!";
                //console.error(error['error']);
            },
            ()    => {
                /* Login user in when everything is ok */
                this.authService.login(this.jwt);
            }
        );
    }
}