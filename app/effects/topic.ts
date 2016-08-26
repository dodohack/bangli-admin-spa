/**
 * Topic[s] side effects
 */
import { Injectable }                     from '@angular/core';
import { Http, Headers, RequestOptions }  from '@angular/http';
import { Effect, Actions }                from '@ngrx/effects';
import { Observable }                     from 'rxjs/Observable';

import { AuthCache }       from '../auth.cache';
import { PrefCache }       from '../pref.cache';
import { TopicActions }  from '../actions';
import { Topic }         from "../models";

@Injectable()
export class TopicEffects {

    headers: Headers;

    constructor (private actions$: Actions,
                 private http: Http) {
        this.headers = new Headers({
            'Authorization': 'Bearer' + AuthCache.token(),
            'Content-Type': 'application/json'});
    }

    @Effect() loadTopics$ = this.actions$.ofType(TopicActions.LOAD_TOPICS)
        .switchMap(action => this.getTopics(action.payload))
        .map(topics => TopicActions.loadTopicsSuccess(topics))
        .catch(() => Observable.of(TopicActions.loadTopicsFail()));

    @Effect() loadTopic$ = this.actions$.ofType(TopicActions.LOAD_TOPIC)
        .switchMap(action => this.getTopic(action.payload))
        .map(topic => TopicActions.loadTopicSuccess(topic))
        .catch(() => Observable.of(TopicActions.loadTopicFail()));

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions


    /**
     * Get single topic(may not use)
     */
    private getTopic(id: number): Observable<Topic> {
        let api = AuthCache.API().cms_topics +
            '/' + id + '?token=' + AuthCache.token();
        return this.http.get(api).map(res => res.json());
    }

    /**
     * Update single topic
     */
    private putTopic(topic: Topic): Observable<Topic> {
        let body = JSON.stringify(topic);
        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API().cms_topics + '/' + topic.id;
        return this.http.put(api, body, options).map(res => res.json());
    }

    /**
     * Create a new topic
     */
    private postTopic(topic: Topic): Observable<Topic> {
        let body = JSON.stringify(topic);

        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API().cms_topics;
        return this.http.post(api, body, options).map(res => res.json());
    }

    /**
     * Delete a topic
     */
    private deleteTopic(topic: Topic): Observable<Topic> {
        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API().cms_topics + '/' + topic.id;
        return this.http.delete(api, options).map(res => res.json());
    }

    /**
     * Get topics
     */
    private getTopics(filters: any): Observable<any> {
        let cur_page = filters.cur_page;
        let status   = filters.status;

        let api = AuthCache.API().topics +
            '?page=' + cur_page +
            '&per_page=' + PrefCache.getPerPage() +
            '&status=' + status +
            '&token=' + AuthCache.token();

        return this.http.get(api).map(res => res.json());
    }

    /**
     * Update topics
     */
    private putTopics(topics: Topic[]): Observable<Topic[]> {
        let body = JSON.stringify(topics);

        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API().cms_topics_batch;
        return this.http.put(api, body, options).map(res => res.json());
    }

    /**
     * Delete topics
     */
    private deleteTopics(topics: Topic[]): Observable<Topic[]> {
        let body = JSON.stringify(topics);

        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API().cms_topics_batch;
        // TODO: http.delete can't have a body
        //return this.http.delete(api, options).map(res => res.json());
    }
}