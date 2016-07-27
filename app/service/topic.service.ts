/**
 * Get topic/topics from API server
 */

import { Injectable }               from '@angular/core';
import { Jsonp, URLSearchParams }   from '@angular/http';
import { Observable }               from "rxjs/Observable";

import { PostStatus }  from '../models/post';
import { AuthService } from './auth.service';
import { APP }         from '../app.api';

@Injectable()
export class TopicService
{
    /* Number of topics per page */
    perPage: any;
    params: URLSearchParams;

    /* Statuses of all topics */
    statuses: Observable<PostStatus[]>;

    /**
     * Initialize common code in constructor, as we can't have ngOnInit
     * in injectable service.
     * @param jsonp
     * @param authService
     */
    constructor(private jsonp: Jsonp, private authService: AuthService)
    {
        /* Set up common JSONP request arguments */
        this.params = new URLSearchParams;
        this.params.set('callback', 'JSONP_CALLBACK');
        this.params.set('token', this.authService.getJwt());

        /* Init number of users showing per list if there is none */
        this.perPage = localStorage.getItem('postsPerPage');
        if (!this.perPage)
            this.setTopicsPerPage(30);
        
        this.initStatuses();
    }

    /**
     * Set number of topics displayed per page
     */
    public setTopicsPerPage(count)
    {
        /* Count must be between [1, 200] */
        this.perPage = count < 1 ? 1 : (count > 200 ? 200 : count);
        localStorage.setItem('topicsPerPage', this.perPage);
    }

    /**
     * Retrieve statuses of topics from API server
     */
    private initStatuses() {
        this.statuses = this.jsonp
            .get(APP.topic_statuses, {search: this.params})
            .map(res => res.json());
    }

    public getTopics(filter, condition, cur_page) {
        this.params.set('per_page', this.perPage);

        /* FIXME: This is not working as we can't see any header is with the request */
        //let headers = new Headers({'Authorization': 'Bearer ' + localStorage.getItem('jwt')});

        /* Setup endpoint and send request to it */
        let endpoint = APP.topics+ '/' + filter + '/' + condition + '/' + cur_page;
        return this.jsonp
            .get(endpoint, {search: this.params})
            .map(res => res.json());
    }

    /**
     * Return the detail of given topic id
     * @param id
     */
    public getTopic(id) {
        let endpoint = APP.topic+ '/' + id;
        return this.jsonp
            .get(endpoint, {search: this.params})
            .map(res => res.json());
    }
}
