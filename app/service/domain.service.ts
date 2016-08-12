/**
 * This service only manages the relationship between user and domains,
 * it is not responsible for currently logged user.
 * The domains of logged user can manage is handled by AuthService.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { AuthService } from './auth.service';
import { AUTH }        from '../api';

@Injectable()
export class DomainService
{
    
    constructor(private http: Http,
                private authService: AuthService) {}

    /**
     *  Get user-domains from bangli-auth
     *  @param uuid - user uuid
     */
    public getDomains(uuid: string)
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
    public postDomains(uuid: string, domains)
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