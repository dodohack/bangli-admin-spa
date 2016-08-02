/* Get a single page object from api server */

import { Injectable }  from '@angular/core';
import { Jsonp, Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { PostStatus, Page } from '../models';
import { AuthService } from './auth.service';
import { APP } from '../app.api';

@Injectable()
export class PageService {

    perPage: any;
    params: URLSearchParams;

    /* Page status */
    statuses: PostStatus[];

    constructor(private jsonp: Jsonp,
                private http: Http,
                private authService: AuthService) {
        /* Set up common JSONP request arguments */
        this.params = new URLSearchParams;
        this.params.set('callback', 'JSONP_CALLBACK');
        this.params.set('token', this.authService.getJwt());

        this.initStatuses();
    }

    /**
     * Retrieve statuses of pages fro API server
     */
    private initStatuses() {
        this.jsonp
            .get(APP.page_statuses, {search: this.params})
            .map(res => res.json())
            .subscribe(statuses => this.statuses = statuses);
    }

}

