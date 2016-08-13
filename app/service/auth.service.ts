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

import { Domain, DOMAINS }      from '../models';
import { UserRole }             from '../models';
import { JwtPayLoad }           from "../models";
import { AUTH }                 from "../api";
import { API_END_POINTS }       from '../api';

var jwtDecode = require('jwt-decode');

@Injectable()
export class AuthService
{
    private role: UserRole;

    private payload: JwtPayLoad;
    public jwt: string;
    
    /* Current managing domain */
    public curDomain: Domain;
    /* Available domain to me */
    public domains: Domain[];

    constructor(private router: Router, private http: Http) 
    {
        console.log("AuthService init");

        /* FIXME: This preload data from localStorage is a temp fix to async
         * FIXME: data issue. We will use Observable as a proper fix later. */
        this.domains = DOMAINS;
        let key = localStorage.getItem('domain');
        if (key) {
            for (let i = 0; i < this.domains.length; i++) {
                if (this.domains[i].key === key) {
                    this.curDomain = this.domains[i];
                    break;
                }
            }
        }
        /* Init stuff from localStorage first */
        let jwt = localStorage.getItem('jwt');
        if (jwt) {
            this.jwt = jwt;
            this.payload = jwtDecode(jwt);
        }
        let role = localStorage.getItem('role')
        if (role) this.role = JSON.parse(role);
        console.log("jwt: ", this.jwt);
        console.log("payload: ", this.payload);
        console.log("role: ", this.role);
        console.log("curDomain: ", this.curDomain);
        
        /* Each time the APP boot, refresh token and domains */
        this.refreshToken();
    }

    /**
     *  Check if current user logged in and if it is a dashboard user
     */
    get isLoggedIn(): boolean
    {
        if (this.jwt == '' || this.jwt == null)
            return false;

        /* Get current unix timestamp in second */
        let now = Math.floor(Date.now()/1000);

        /* Token expired, refresh it */
        if (this.payload.exp < now) {
            //this.refreshToken();
            // TODO: Remove this return
            return false;
        }

        /* Is a dashboard user or not */
        return this.payload.dbu;
    }

    /**
     * FIXME: If this class is not singleton, we can't do this, see
     * http://stackoverflow.com/questions/34376854/delegation-eventemitter-or-observable-in-angular2/35568924#35568924
     * for better solution.
     */
    /* Get API endpoints for current managed domain */
    get API() { return API_END_POINTS[this.curDomain.key]; }
    get name(): string { return this.payload.aud; }
    get uuid(): string { return this.payload.sub; }
    get isSuperUser(): boolean { return this.payload && this.payload.spu; }
    get isAdmin(): boolean {
        return this.isSuperUser || (this.role && this.role.name === 'administrator');
    }
    get isShopMgr(): boolean {
        return this.isAdmin || this.role.name === 'shop_manager';
    }
    get isEditor(): boolean {
        return this.isShopMgr || this.role.name === 'editor';
    }
    get isAuthor(): boolean {
        return this.isEditor || this.role.name === 'author';
    }

    public hasRole(role: string): boolean {
        /* FIXME: this.role is not ready !!!! */
        /* TODO: Observer, Observer !!! */
        switch(role) {
            case 'super_user':
                return this.isSuperUser;
            case 'administrator':
                return this.isAdmin;
            case 'shop_manager':
                return this.isShopMgr;
            case 'editor':
                return this.isEditor;
            case 'author':
                return this.isAuthor;
            default:
                return false;
        }

    }

    /**
     * FIXME: We should move user login logic from login.form.ts to here
     * Login user with given JWT and redirect user to dashboard
     * This function called on both register success and login success
     */
    public login(response: any, isRefresh?: boolean)
    {
        let jwt = response['token'];

        if (!jwt || typeof jwt !== 'string') {
            console.error("Empty JWT returned from auth server!");
            return;
        }

        /* Initial decoded jwt */
        this.payload = jwtDecode(jwt);
        /* Not a dashboard user */
        if (!this.payload.dbu) return '你不是后台用户!';

        /* Only dashboard user has this attributes returned */
        let domains = response['domains'];
        /* Can not user any domains */
        if (!domains.length) return '你无权管理任何站点, 请联系管理员!';

        this.jwt = jwt;
        /* Init this.domains */
        this.initDomains(domains);

        /* Init user site level permission as well */
        if (!isRefresh)
            this.initSiteLevelRole();

        /*
         * Remember user login so they don't need to re-login after restart the
         * browser.
         */
        localStorage.setItem('jwt', this.jwt);

        /* Redirect user to dashboard if user is first time login */
        if (!isRefresh)
            this.router.navigate(['/']);
    }

    /**
     *  Logout user and redirect user to login page
     */
    public logout()
    {
        /* Empty some storage that may diff from differen user roles */
        localStorage.removeItem('jwt');
        sessionStorage.removeItem('domain');
        localStorage.removeItem('domain');
        localStorage.removeItem('role');
        this.router.navigate(['/login']);
        console.log("FIXME: Redirected back from login page sometimes; So a reload() is invoked");
        window.location.reload();
    }

    /**
     * Switch current managing domain to another
     * @param key
     */
    public switch2Domain(key: string)
    {
        let found = false;
        for (let i = 0; i < this.domains.length; i++) {
            if (key == this.domains[i].key) {
                this.curDomain = this.domains[i];
                found = true;
                break;
            }
        }
        
        if (found) {
            /* Must save to session storage as APP is going to be reloaded,
             * everything thing unsaved is lost after reload. */
            sessionStorage.setItem('domain', key);
            localStorage.setItem('domain', key);
            
            /* Reload the app */
            this.router.navigate(['/']);
            window.location.reload();
            
        }
    }
    
    public unsetDefaultDomain() 
    {
        /* Update the storage */
        console.log("DUMMY OPTION USED TO TEST EMPTY STORAGE KEY 'domain'");
        /*
        sessionStorage.removeItem('domain');
        localStorage.removeItem('domain');

        // Reload the app
        this.router.navigate(['/']);
        window.location.reload();
        */
    }

    /* Login user, refresh token, register user */
    public postLogin(form: string)
    {
        return this.post(AUTH.login, form); 
    }
    public postRefresh(form: string) 
    {
        return this.post(AUTH.refresh, form);
    }
    public postRegister(form: string)
    {
        return this.post(AUTH.register, form);
    }
    public postUpdatePassword(form: string)
    {
        return this.post(AUTH.update_password, form);
    }
    
    
    //////////////////////////////////////////////////////////////////////////
    // Private helper functions
    
    private post(api: string, body: string)
    {
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });
        
        /* Post data and convert server response to JSON format */
        return this.http.post(api, body, options).map(res => res.json());        
    }

    private _get(api: string)
    {
        /* Set http authenticate header */
        let headers = new Headers({'Authorization': 'Bearer ' + this.jwt});
        let options = new RequestOptions({ headers: headers });

        return this.http.get(api, options).map(res => res.json());
    }

    /**
     * Retrieve user permission from app server
     * @returns {Observable<R>}
     */
    private getPermissions()
    {
        return this._get(this.API.permissions);
    }

    private getRole()
    {
        return this._get(this.API.role);
    }

    /**
     * Refresh current token
     */
    private refreshToken()
    {
        /* Init JWT if any */
        let jwt = localStorage.getItem('jwt');
        if (jwt) {
            let form = 'token=' + jwt;
            this.postRefresh(form).subscribe(data => this.login(data, true));
        }
    }

    /**
     * Init domains available for me and my default domain
     * @param domains - my domains comes from server
     */
    private initDomains(domains: Domain[]) 
    {
        for (let i = 0; i < this.domains.length; i++) {
            this.domains[i].checked = false;
            for (let j = 0; j < domains.length; j++) {
                if (this.domains[i].key == domains[j].key) {
                    this.domains[i].checked = true;
                    /* Init current domain if it is not initialized */
                    if (!this.curDomain) {
                        this.curDomain = this.domains[i];
                    }
                    break;
                }
            }
        }

        let sessionDomainKey = sessionStorage.getItem('domain');
        let localDomainKey   = localStorage.getItem('domain');

        /* We always have this.curDomain initialized */
        if (!sessionDomainKey && !localDomainKey) {
            sessionStorage.setItem('domain', this.curDomain.key);
            localStorage.setItem('domain', this.curDomain.key);
            return;
        }

        if (!sessionDomainKey && localDomainKey) {
            let domain = this.getDomainFromKey(localDomainKey);
            if (domain) this.curDomain = domain;
            sessionStorage.setItem('domain', localDomainKey);
            return;
        }

        if (sessionDomainKey) {
            let domain = this.getDomainFromKey(sessionDomainKey);
            if (domain) this.curDomain = domain;
            return;
        }
    }

    /**
     * Get a usable domain from available domains list
     * @param key
     * @returns {Domain}
     */
    private getDomainFromKey(key: string)
    {
        for (let i = 0; i < this.domains.length; i++) {
            if (this.domains[i].key == key)
                return this.domains[i];
        }

        return;
    }

    /**
     * When user's current domain is ready, we can init his permissions for
     * current domain now.
     */
    private initSiteLevelRole()
    {
        if (!this.curDomain) {
            console.error("User current domain is not ready!");
            return;
        }

        this.getRole().subscribe(role => {
            this.role = role;
            localStorage.setItem('role', JSON.stringify(this.role));
        });
    }

}
