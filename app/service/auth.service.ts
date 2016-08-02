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

import { Login }     from "../models/login";
import { Register }  from "../models/register";
import { JwtPayLoad }from "../models";
import { AUTH }      from "../app.api";

var jwtDecode = require('jwt-decode');

@Injectable()
export class AuthService
{
    private decoded_jwt = new JwtPayLoad('', 0, 0, 0, '', '', '');
    private jwt;

    constructor(private router: Router, private http: Http) {
        this.jwt = localStorage.getItem('jwt');
        if (this.jwt !== '' && this.jwt !== null)
            this.decoded_jwt = jwtDecode(this.jwt);
    }

    /**
     *  Gettter: Check if current user logged or not
     */
    get isLoggedIn(): boolean
    {
        if (this.jwt == '' || this.jwt == null)
            return false;

        /* Get current unix timestamp in second */
        let now = Math.floor(Date.now()/1000);

        /* Token expired, refresh it */
        if (this.decoded_jwt.exp < now) {
            this.refreshToken();
            // TODO: Remove this return
            return false;
        }

        return true;
    }

    /**
     * TODO: Refresh JWT token
     */
    private refreshToken()
    {
        console.log("TODO: Implement JWT refresh");
    }

    /**
     * FIXME: We should move user login logic from login.form.ts to here
     * Login user with given JWT and redirect user to dashboard
     * This function called on both register success and login success
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
     * FIXME: If this class is not singleton, we can't do this, see
     * http://stackoverflow.com/questions/34376854/delegation-eventemitter-or-observable-in-angular2/35568924#35568924
     * for better solution.
     */
    public getName()
    {
        return this.decoded_jwt.aud;
    }
}
