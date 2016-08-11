/**
 * Website management related service
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { AuthService } from './auth.service';
import { AUTH } from '../api';
import { Website } from "../models";

/*
 * TODO: Refactor this class
 * 1. Do not get available websites/domains from server, use SPA preset ones.
 * 2. Only get websites/domains ID current user/given user can use from server.
 * 3. So we can list all available websites/domains in topbar dropdown menu at
 *    boot time, then filter some out by setting their checked status via the
 *    data got from stage 2.
 * 4. Domains.ts and WebsiteService.ts can be merged into single file, all
 *    constants definition should be moved into modles/website.ts.
 * This means: the websites/domains are always available to the SPA, only need
 * to get the checked status from remote server. This fixes Observable
 * lazy/delayed loading problem when network is slow.
 */

@Injectable()
export class WebsiteService
{
    headers: Headers;
    options: RequestOptions;
    
    /* Current user's websites */
    myWebsites: Website[];

    constructor(private http: Http, private authService: AuthService) {
        /* Use form to submit data, avoid XHR CORS request */
        this.headers =
            new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        this.options = new RequestOptions({ headers: this.headers });

        this.initMyWebsites();
    }
    
    /* Get websites I have dashboard access */
    private initMyWebsites() {
        let endpoint = AUTH.websites + '?token=' + this.authService.getJwt();
        this.http.get(endpoint).map(res => res.json())
            .subscribe(websites => {
                this.myWebsites = this.initCheckStatus(websites['all_websites'], 
                                                       websites['my_websites']);
            });
    }

    /**
     * Return a new array of website contains all available websites, but with
     * 'checked' status initialized.
     * A 'checked' website is the website user can access.
     * @param websites
     * @param tempWebs
     * @returns {any}
     */
    public initCheckStatus(websites: Website[], tempWebs: Website[])
    {
        let length    = websites.length;
        let tmpLength = tempWebs.length;
        let newWebsites: Website[] = [];

        /* Initial check status */
        for (let i = 0; i < length; i++) {
            newWebsites.push(websites[i]);
            newWebsites[i].checked = false;
            for (let j = 0; j < tmpLength; j++) {
                if (newWebsites[i].id == tempWebs[j].id) {
                    newWebsites[i].checked = true;
                    break;
                }
            }
        }
        return newWebsites;
    }

    /* Get websites of given user can use */
    public getUserWebsites(uuid: string) {
        let endpoint = AUTH.websites + '?uuid=' + uuid
                       + '&token=' + this.authService.getJwt();
        return this.http.get(endpoint).map(res => res.json());
    }
    
    /* Get all websites */
    public getAvailableWebsites() {
        let endpoint = AUTH.available_websites + '?token=' + this.authService.getJwt();
        return this.http.get(endpoint).map(res => res.json());
    }
    
    public postUserWebsites(uuid: string, websites) {
        let endpoint = AUTH.websites + '?uuid=' + uuid
            + '&token=' + this.authService.getJwt();

        /* Stripe down useless data, only post site id and checked status to server */
        let body = websites.map(function(w) {
           return {'id': w.id, 'checked': w.checked};
        });

        body = JSON.stringify(body);
        return this.http.post(endpoint, body, this.options).map(res => res.json());
    }

    public getKey(): string {
        return sessionStorage.getItem('website.key');
    }

    public getName(): string {
        return sessionStorage.getItem('website.name');
    }

    public getUrl(): string {
        return sessionStorage.getItem('website.url');
    }

    ///////////////////////////////////////////////////////////////////////////
    // Private

    private initCurrentWebsite(websites: Website[])
    {
        /* Current website from session */
        let key  = sessionStorage.getItem('website.key');
        let name = sessionStorage.getItem('website.name');
        let url  = sessionStorage.getItem('website.url');

        /* Validate if user can access the stored web */
        if (key && name && url) {

        }
    }


}