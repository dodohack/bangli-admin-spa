/**
 * This is the service that pings api server periodically with optional data.
 */

import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Store }                         from '@ngrx/store';
import { Observable }                    from 'rxjs/Observable';
import { Subject }                       from 'rxjs/Subject';

import { APIS, API_PATH }                from './api';
import { AppState }                      from './reducers';
import { AuthState }                     from './reducers/auth';
import { EntitiesState }                 from './reducers/entities';
import { EntitiesStateGroup }            from './reducers/entities';

@Injectable()
export class Ping {
    timer: any;

    authState: AuthState;
    entitiesState: EntitiesState;

    // Other componenets should uses this
    activity$: Subject<any> = new Subject<any>(); 
    latency$: Subject<{[key: string]: number}>  = new Subject<any>();

    constructor (private store: Store<AppState>,
                 private http: Http) {
        this.store.select<AuthState>('auth').subscribe(p => this.authState = p);
        this.store.select<EntitiesState>('entities').subscribe(p => {
            // FIXME: We need to determine which entities to listen on
            this.postsState = p
        });
        // Start the beacon.
        this.run();
    }

    /**
     * Ping server in every 20 seconds
     */
    run() {
        this.timer = Observable.interval(20000).subscribe(x => {

            let timeStart: number = performance.now();
            
            for (let key of this.authState.keys) {
                if (key === this.authState.key) {
                    // Active API server, test connectivity with data
                    // latency -1 means error or disconnected
                    this.ping(key, true).subscribe(
                        activities => {
                            let timeEnd: number = performance.now();
                            this.activity$.next(activities);
                            this.latency$.next({[key]: timeEnd - timeStart});
                        },
                        err => this.latency$.next({[key]: -1})
                    );
                } else if (0) {
                    // Idle API server, test connectivity only
                    this.ping(key, false).subscribe(
                        res => {
                            let timeEnd: number = performance.now();
                            this.latency$.next({[key]: timeEnd - timeStart});
                        },
                        err => this.latency$.next({[key]: -1})
                    );
                }
            }

        });
    }

    stop() {
        this.timer.unsubscribe();
    }


    ping(key: string, isActive: boolean) {
        let api = APIS[key] + API_PATH[key].ping;

        // body for active/inactive api server
        let body = 'token=' + this.authState.token;
        if (isActive) {
            // Lock resource if sth is in editing
            let params = this.getPingParams();
            if (params) body += '&action=lock&active=yes' + params;
            else        body += '&action=ping&active=yes';
        } else {
            body += '&action=ping&active=no';
        }

        // FIXME: As CORS post requires extra 'OPTIONS' request from modern
        // browsers, so we use http get instead.
        api = api + '?' + body;
        //console.log("Pinging server: ", api);
        return this.http.get(api).map(res => res.json());
    }

    /**
     * Construct extra form data used to ping active API server
     * NOTE: User can only edit 1 type of content at a SPA client.
     */
    private getPingParams()
    {
        if (this.postsState.editing.length)
            return '&type=post&ids=' + this.postsState.editing.toString();
        if (this.topicsState.editing.length)
            return '&type=topic&ids=' + this.topicsState.editing.toString();
        if (this.pagesState.editing.length)
            return '&type=page&ids=' + this.pagesState.editing.toString();

        return null;
    }
}
