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

@Injectable()
export class AuthService
{
    constructor(private router: Router) {}

    /**
     *  Check if current user logged or not
     */
    public isLoggedIn(): boolean
    {
        let jwt = localStorage.getItem('jwt');
        if (jwt == '' || jwt == null)
            return false;

        /* TODO: check JWT expiration */
        console.log("AuthService::isLoggedIn: TODO: check JWT expiration");

        return true;
    }

    /**
     * Login user with given JWT and redirect user to dashboard
     */
    public login(jwt: string)
    {
        localStorage.setItem('jwt', jwt);
        //console.log("LOGIN DONE, JWT: " + jwt);
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
     * Return JWT token
     */
    public getJwt()
    {
        return localStorage.getItem('jwt');
    }
}
