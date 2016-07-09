/**
 * This is the register page for backend
 */

import { Component }         from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NgForm }            from '@angular/forms';
import { Observable }        from 'rxjs/Observable';

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
    submitted = false;


    constructor(private http: Http) {}

    /* POST data to auth server */
    postRegister() {
        let body = this.model.stringify();
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        /* Post form data and convert server response to JSON format */
        return this.http.post(API.register, body, options)
                   .map(res => res.json())
                   .catch(error => {
                       error = error.json();
                       return Observable.throw(error);
                   });
    }

    /* Triggered when form submit happens */
    onSubmit() {
        /* Reset the error message */
        this.error.reset();

        this.postRegister()
            .subscribe(
                data  => {
                    this.jwt = data['token'];
                    this.submitted = true;
                },
                error => {
                    error['name'] ? this.error['name'] = error['name'] : false;
                    error['email'] ? this.error['email'] = error['email'] : false;
                    error['password'] ? this.error['password'] = error['password'] : false;
                    console.error(error);
                },
                ()    => { console.log("REGISTER DONE!"); }
            );
    }

    get diagnostic() { return this.error['name']; }
}