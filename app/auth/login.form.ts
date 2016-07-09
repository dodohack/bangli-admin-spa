/**
 * This is the login page for backend
 */

import { Component }         from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NgForm }            from '@angular/forms';
import { Observable }        from 'rxjs/Observable';

import { AuthService } from '../service/auth.service';

import { Login } from './login';
import { API }   from '../app.api';

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

    constructor(private http: Http,
                private router: Router,
                private authService: AuthService)
    {
        /* Redirect user if already logged in */
        if (this.authService.isLoggedIn())
            this.router.navigate(['/']);
    }

    /* POST data to auth server */
    postLogin()
    {
        /* Form a http post data */
        let body    = this.model.stringify();
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });
        
        /* Post data and convert server response to JSON format */
        return this.http.post(API.login, body, options)
                   .map(res => res.json())
                   .catch(error => {
                       error = error.json();
                       return Observable.throw(error);
                   });
    }
    
    /* Triggered when user clicks on submit button */
    onSubmit()
    {
        /* Reset error massage */
        this.error = '';
        
        this.postLogin().subscribe(
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