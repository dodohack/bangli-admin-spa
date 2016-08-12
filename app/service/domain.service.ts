/**
 * Website management related service
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from "@angular/router";

import { AuthService } from './auth.service';
import { API_END_POINTS, AUTH } from '../api';
import { DUMMY_DOMAIN, DOMAINS, Domain } from "../models/domain";


@Injectable()
export class DomainService
{
    /* Domain the user is accessing */
    /*
     * FIXME: Due to async network issue, curDomain is not available during
     * some template initializing, have to had to init value as temp fix,
     * we are going to define curDomain as Observable so to fix this problem
     */
    curDomain: Domain;
    
    /* All domains without check status */
    domains = DOMAINS;
    
    constructor(private http: Http,
                private router: Router,
                private authService: AuthService) 
    {
        this.initCurDomain();
        this.initMyDomains();
        console.log("DomainService Init: CURRENT DOMAIN: ", this.curDomain);
    }

    /* Get API endpoints for current managed domain */
    get API() {
        if (!this.curDomain) {
            console.error("Current domain is not initialized yet, " +
                "this happens when network is slow");
        }
        return API_END_POINTS[this.curDomain.key];
    }

    get key() { return this.curDomain.key; }
    get name() { return this.curDomain.name; }

    /**
     * Switch the domain currently managing, and reload the application
     */
    public switch2Domain(key: string)
    {
        let isFound = false;
        for (let i = 0; i < this.domains.length; i++) {
            if (key == this.domains[i].key) {
                this.curDomain = this.domains[i];
                isFound = true;
                break;
            }
        }

        if (isFound) {
            /* Update the storage */
            sessionStorage.setItem('domain', key);
            localStorage.setItem('domain', key);

            /* Reload the app */
            this.router.navigate(['/']);
            window.location.reload();
        }
    }

    public cleanDefaultDomain()
    {
        /* Update the storage */
        sessionStorage.removeItem('domain');
        localStorage.removeItem('domain');

        /* Reload the app */
        this.router.navigate(['/']);
        window.location.reload();
    }

    /**
     * Set the checked status of domains current user can use
     */
    private initMyDomains() 
    {
        let endpoint = AUTH.domains + '?token=' + this.authService.jwt;
        
        this.http.get(endpoint).map(res => res.json())
            .subscribe(domains => {
                for (let i = 0; i < this.domains.length; i++) {
                    for (let j = 0; j < domains.length; j++) {
                        if (this.domains[i].key == domains[j].key) {
                            this.domains[i].checked = true;
                            break;
                        }
                    }
                }
            });
    }

    /**
     * Init current using domain for current user
     */
    private initCurDomain() 
    {
        /* Initialize to a placeholder */
        this.curDomain = DUMMY_DOMAIN;

        /* Get current domain from session storage first */
        let key = sessionStorage.getItem('domain');
        if (key) {
            this.curDomain = this.getDomainFromKey(key);
            /* Got a valid domain */
            if (this.curDomain.key != 'dummy') return;
        }

        /* Get current domain from local storage if can get it previously */
        key = localStorage.getItem('domain');
        if (key) {
            this.curDomain = this.getDomainFromKey(key);

            /* Got a valid domain, init sessionStorage as well */
            if (this.curDomain.key != 'dummy') {
                sessionStorage.setItem('domain', this.curDomain.key);
                return;
            }
        }
    }

    /**
     * Validate domain key stored in session/localStorage is correct
     * @param key
     * @returns {domain}
     */
    private getDomainFromKey(key: string)
    {
        let length = this.domains.length;
        for (let i = 0; i < length; i++) {
            if (this.domains[i].key === key)
                return this.domains[i];
        }
        return;
    }

    /**
     *  Get websites of given user can use
     *  @param uuid - user uuid
     */
    public getUserDomains(uuid: string)
    {
        let endpoint = AUTH.domains + '?uuid=' + uuid
                       + '&token=' + this.authService.jwt;

        return this.http.get(endpoint).map(res => res.json());
    }

    /**
     * Save user-domains to bangli-auth
     * @param uuid
     * @param domains
     * @returns {Observable<R>}
     */
    public postUserWebsites(uuid: string, domains)
    {
        let headers =
            new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        let endpoint = AUTH.domains + '?uuid=' + uuid
            + '&token=' + this.authService.jwt;

        /* Stripe down useless data, only post site id and checked status to server */
        let body = domains.map(function(d) {
           return {'key': d.key, 'checked': d.checked};
        });

        body = JSON.stringify(body);
        return this.http.post(endpoint, body, options).map(res => res.json());
    }
}