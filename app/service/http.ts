/**
 * Http request base class for all authentication needed request
 */
import { Http, Headers, RequestOptions } from '@angular/http';

import { AuthService } from './auth.service';
import { Api }         from '../api';
import { UserPreference } from '../preference';

export class ProtectedHttp
{
    /* API endpoint of current domain */
    API: any;

    /* Http request headers */
    headers: Headers;

    constructor(private http: Http,
                private authService: AuthService) {
        console.log("ProtectedHttp initialized.");

        this.API = Api.getEndPoint();

        /* Set http authenticate header */
        this.headers =
            new Headers({'Authorization': 'Bearer ' + this.authService.getJwt()});
    }
}
