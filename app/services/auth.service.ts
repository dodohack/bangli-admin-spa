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
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { AUTH }                 from "../api";

/* FIXME: Merge Login, Register, User into single model */
import {User} from "../models/user";

var jwtDecode = require('jwt-decode');

@Injectable()
export class NewAuthService {
    constructor(private router:Router, private http:Http) {
        console.log("New AuthService init");
    }

    login (user: User): Observable<User> {
        return this.post(AUTH.login, user.stringify());
    }

    ///////////////////////////////////////////////////////////////////////////
    // Helper functions

    private post(api: string, body: string)
    {
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        /* Post data and convert server response to JSON format */
        return this.http.post(api, body, options).map(res => res.json());
    }
}