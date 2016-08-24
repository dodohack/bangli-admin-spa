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

    constructor (private actions$: Actions,
                 private http: Http) {}

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
     * Save single topic/multiple topics
     */
    private save(topics: Topic[]): Observable<Topic[]> {
        let api = '';
        let body = JSON.stringify(topics);

        let headers = new Headers({
            'Authorization': AuthCache.token(),
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(api, body, options).map(res => res.json());
    }

    private getTopics(filters: any): Observable<any> {
        let cur_page = filters.cur_page;
        //let status   = filters.status;
        let api = AuthCache.API().topics + '/' + cur_page +
            '?per_page=' + PrefCache.getPerPage() +
            //'&status=' + status +
            '&token=' + AuthCache.token();
        return this.http.get(api).map(res => res.json());
    }


    private getTopic(id: string): Observable<Topic> {
        let api = AuthCache.API().topic + '/' + id + '?token=' + AuthCache.token();
        return this.http.get(api).map(res => res.json());
    }
}