/* Get a single page object from api server */

import { Injectable }  from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { PostStatus, Page } from '../models';
import { AuthService }      from './auth.service';
import { Api }            from '../api';
import { UserPreference } from '../preference';

@Injectable()
export class PageService
{
    /* API endpoint of current domain */
    API: any;

    /* Http request headers */
    headers: Headers;
    options: RequestOptions;

    /* Page status */
    statuses: PostStatus[];

    constructor(private http: Http,
                private authService: AuthService) {
        console.log("PageService initialized.");

        this.API = Api.getEndPoint();

        /* Set http authenticate header */
        this.headers =
            new Headers({'Authorization': 'Bearer ' + this.authService.getJwt()});
        this.options = new RequestOptions({ headers: this.headers });

        this.initStatuses();
    }

    /**
     * Retrieve statuses of pages fro API server
     */
    private initStatuses() {
        this.http.get(this.API.page_statuses, this.options)
            .map(res => res.json())
            .subscribe(statuses => this.statuses = statuses);
    }

}

