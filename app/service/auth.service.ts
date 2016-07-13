/**
 * We use JWT instead of cookie to authenticate user, when user sends a request
 * each time, we will send JWT to api server with the request, so api server
 * knows if the access is authenticated or not.
 * So, if there is a JWT stored in browser's localStorage and is not expired,
 * we can always assume user is logged in(don't need to send 2 requests at each
 * time when accesses protected resources).
 * If nasty user manually creates a JWT or modifies the JWT in localStorage,
 * api server will response with error code to let client app to redirect user
 * to login page.
 */
import { Injectable } from '@angular/core';
import { Router }     from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http'

import { Observable } from 'rxjs/Observable';

import {Login, Register}  from "../auth/form";
import {AUTH}             from "../app.api";

var jwtDecode = require('jwt-decode');

@Injectable()
export class AuthService
{
    private decoded_jwt;
    private jwt;

    constructor(private router: Router, private http: Http) {}

    /**
     *  Check if current user logged or not
     */
    public isLoggedIn(): boolean
    {
        let jwt = localStorage.getItem('jwt');
        if (jwt == '' || jwt == null)
            return false;

        /* Get decoded payload */
        let decoded = jwtDecode(jwt);
        /* Get current unix timestamp in second */
        let now = Math.floor(Date.now()/1000);

        /* Token expired, remove it and return false */
        if (decoded.exp < now) {
            localStorage.removeItem('jwt');
            return false;
        }

        return true;
    }

    /**
     * FIXME: We should move user login logic from login.form.ts to here
     * Login user with given JWT and redirect user to dashboard
     */
    public login(jwt: string)
    {
        this.jwt = jwt;
        /* Initial decoded jwt */
        this.decoded_jwt = jwtDecode(jwt);

        /*
         * Remember user login so they don't need to re-login after restart the
         * browser.
         */
        localStorage.setItem('jwt', jwt);

        /* Redirect user to dashboard */
        this.router.navigate(['/']);
    }

    /**
     *  Logout user and redirect user to login page
     */
    public logout()
    {
        localStorage.removeItem('jwt');
        //console.log("LOGOUT DONE!");
        this.router.navigate(['/login']);
    }

    /**
     * Send user login credentials to sso server and retain jwt
     * This should only be called when user explicitly submit the login form.
     */
    public postLogin(form: Login)
    {
        /* Form a http post data */
        let body    = form.stringify();
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        /* Post data and convert server response to JSON format */
        return this.http.post(AUTH.login, body, options)
            .map(res => res.json())
            .catch(error => {
                error = error.json();
                return Observable.throw(error);
            });
    }

    /**
     * Send user register credentials to sso server and retain jwt.
     * This should be only called for user registration.
     */
    public postRegister(form: Register)
    {
        /* Form a http post data */
        let body    = form.stringify();
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        /* Post data and convert server response to JSON format */
        return this.http.post(AUTH.register, body, options)
            .map(res => res.json())
            .catch(error => {
                error = error.json();
                return Observable.throw(error);
            });
    }

    /**
     * Return JWT token
     */
    public getJwt()
    {
        return localStorage.getItem('jwt');
    }

    /**
     * Return user name
     */
    public getName()
    {
        return this.decoded_jwt.name;
    }
}
