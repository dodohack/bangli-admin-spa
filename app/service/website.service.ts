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
    constructor(private http: Http, private authService: AuthService) {}
    
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
}