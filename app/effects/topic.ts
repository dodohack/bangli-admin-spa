/**
 * Topic[s] side effects
 */
import { Injectable }                     from '@angular/core';
import { Http, Headers, RequestOptions }  from '@angular/http';
import { Effect, Actions }                from '@ngrx/effects';
import { Observable }                     from 'rxjs/Observable';

import { AuthCache }       from '../auth.cache';
import { PrefCache }       from '../pref.cache';
import { TopicActions }    from '../actions';
import { AlertActions }    from '../actions';
import { Topic }           from "../models";
import { TopicParams }     from "../models";

@Injectable()
export class TopicEffects {

    constructor (private actions$: Actions,
                 private http: Http) {}

    get headers() {
        return new Headers({
            'Authorization': 'Bearer' + AuthCache.token(),
            'Content-Type': 'application/json'});
    }

    @Effect() loadTopics$ = this.actions$.ofType(TopicActions.LOAD_ENTITIES)
        .switchMap(action => this.getTopics(action.payload))
        .map(topics => TopicActions.loadTopicsSuccess(topics))
        .catch(() => Observable.of(TopicActions.loadTopicsFail()));

    @Effect() loadTopic$ = this.actions$.ofType(TopicActions.LOAD_ENTITY)
        .switchMap(action => this.getTopic(action.payload))
        .map(topic => TopicActions.loadTopicSuccess(topic))
        .catch(() => Observable.of(TopicActions.loadTopicFail()));

    @Effect() putTopic$ = this.actions$.ofType(TopicActions.SAVE_ENTITY)
        .switchMap(action => this.saveTopic(action.payload)
            .map(topic => TopicActions.saveTopicSuccess(topic))
            .catch(() => Observable.of(TopicActions.saveTopicFail()))
        );

    @Effect() saveTopicSuccess$ = this.actions$.ofType(TopicActions.SAVE_ENTITY_SUCCESS)
        .map(action => AlertActions.success('专题保存成功!'));

    @Effect() saveTopicFail$ = this.actions$.ofType(TopicActions.SAVE_ENTITY_FAIL)
        .map(action => AlertActions.error('专题保存失败!'));

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions

    /**
     * Get single topic
     */
    private getTopic(id: number): Observable<Topic> {
        let api = AuthCache.API() + AuthCache.API_PATH().cms_topics +
            '/' + id + '?token=' + AuthCache.token();
        return this.http.get(api).map(res => res.json());
    }

    /**
     * Create/update a topic
     */
    private saveTopic(topic: Topic): Observable<Topic> {
        let api = AuthCache.API() + AuthCache.API_PATH().cms_topics;
        let body = JSON.stringify(topic);
        let options = new RequestOptions({ headers: this.headers });

        // Update an existing topic
        if (topic.id && topic.id !== 0)
            api = api + '/' + topic.id;

        // Create/update a topic
        return this.http.put(api, body, options).map(res => res.json());
    }

    /**
     * Delete a topic
     */
    private deleteTopic(topic: Topic): Observable<Topic> {
        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API() + AuthCache.API_PATH().cms_topics + '/' + topic.id;
        return this.http.delete(api, options).map(res => res.json());
    }

    /**
     * Get topics
     */
    private getTopics(params: TopicParams): Observable<any> {
        let api = AuthCache.API() + AuthCache.API_PATH().cms_topics
            + params.toQueryString()
            + '&per_page=' + PrefCache.getPerPage()
            + '&token=' + AuthCache.token();

        console.log("LOAD TOPIC FROM URL: ", api);

        return this.http.get(api).map(res => res.json());
    }

    /**
     * Update topics
     */
    private putTopics(topics: Topic[]): Observable<Topic[]> {
        let body = JSON.stringify(topics);

        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API() + AuthCache.API_PATH().cms_topics_batch;
        return this.http.put(api, body, options).map(res => res.json());
    }

    /**
     * Delete topics
     */
    private deleteTopics(topics: Topic[]): Observable<Topic[]> {
        let body = JSON.stringify(topics);

        let options = new RequestOptions({ headers: this.headers });

        let api = AuthCache.API() + AuthCache.API_PATH().cms_topics_batch;
        // TODO: http.delete can't have a body
        console.error("Unimplemented: deleteTopics");
        return this.http.delete(api, options).map(res => res.json());
    }
}
