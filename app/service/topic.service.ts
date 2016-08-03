/**
 * Get topic/topics from API server
 */

import { Injectable }               from '@angular/core';
import { Http, Headers, RequestOptions }   from '@angular/http';

import { PostStatus }  from '../models';
import { AuthService } from './auth.service';

import { Api }            from '../api';
import { UserPreference } from '../preference';

@Injectable()
export class TopicService
{
    /* API endpoint of current domain */
    API: any;

    /* Http request headers */
    headers: Headers;
    options: RequestOptions;

    /* Statuses of all topics */
    statuses: PostStatus[];

    constructor(private http: Http,
                private authService: AuthService)
    {
        console.log("TopicService initialized.");

        this.API = Api.getEndPoint();

        /* Set http authenticate header */
        this.headers =
            new Headers({'Authorization': 'Bearer ' + this.authService.getJwt()});
        this.options = new RequestOptions({ headers: this.headers });

        this.initStatuses();
    }

    /**
     * Retrieve list of topics for TopicsPage
     */
    public getTopics(filter, condition, cur_page) {
        /* http://api/admin/topics/{filter}/{cond}/{cur_page}?per_page=<number> */
        let endpoint = this.API.topics + '/' + filter + '/' + condition + '/' +
            cur_page + '?per_page=' + UserPreference.itemsPerList();

        return this.http.get(endpoint, this.options).map(res => res.json());
    }


    /**
     * Retrieve statuses of topics from API server
     */
    private initStatuses() {
        this.http.get(this.API.topic_statuses, this.options)
            .map(res => res.json())
            .subscribe(statuses => this.statuses = statuses);
    }

    /**
     * Return the detail of given topic id
     * @param id
     */
    public getTopic(id) {
        return this.http.get(this.API.topic + '/' + id, this.options)
                   .map(res => res.json());
    }
}
