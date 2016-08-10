/**
 * Website management related service
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { AuthService } from './auth.service';
import { AUTH } from '../api';

@Injectable()
export class WebsiteService
{
    headers: Headers;
    options: RequestOptions;

    constructor(private http: Http, private authService: AuthService) {
        /* Use form to submit data, avoid XHR CORS request */
        this.headers =
            new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        this.options = new RequestOptions({ headers: this.headers });

    }
    
    /* Get websites I can use */
    public getMyWebsites() {
        let endpoint = AUTH.websites + '?token=' + this.authService.getJwt();
        return this.http.get(endpoint).map(res => res.json());
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
    
    public saveUserWebsites(uuid: string, websites) {
        let endpoint = AUTH.websites + '?uuid=' + uuid
            + '&token=' + this.authService.getJwt();

        /* Stripe down useless data, only post site id and checked status to server */
        let body = websites.map(function(w) {
           return {'id': w.id, 'checked': w.checked};
        });

        body = JSON.stringify(body);
        return this.http.post(endpoint, body, this.options).map(res => res.json());
    }
}