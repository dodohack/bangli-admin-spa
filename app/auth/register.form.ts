/**
 * This is the register page for backend
 */

import { Component }         from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NgForm }            from '@angular/forms';
import { Observable }        from 'rxjs/Observable';

import { AuthService }              from '../service/auth.service';
import { Register, RegisterError }  from './register';
import { API }                      from '../app.api';

@Component({
    selector: 'register-form',
    templateUrl: 'app/auth/register.form.html',
    directives: [ROUTER_DIRECTIVES]
})
export class RegisterForm
{
    jwt: any;
    error = new RegisterError('', '', '');
    model = new Register('', '', '', '', API.register_callback);

    constructor(private http: Http, private authService: AuthService) {}

    /* POST data to auth server */
    postRegister()
    {
        /* Form a http post data */
        let body    = this.model.stringify();
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        /* Post data and convert server response to JSON format */
        return this.http.post(API.register, body, options)
                   .map(res => res.json())
                   .catch(error => {
                       error = error.json();
                       return Observable.throw(error);
                   });
    }

    /* Triggered when user clicks on submit button */
    onSubmit()
    {
        /* Reset the error message */
        this.error.reset();

        this.postRegister().subscribe(
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