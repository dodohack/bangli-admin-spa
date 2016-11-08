/**
 * Load menu configurations
 */
import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Effect, Actions }               from '@ngrx/effects';
import { Observable }                    from 'rxjs/Observable';

import { CacheSingleton }  from './cache.singleton';
import { APIS, API_PATH }  from '../api';
import { FeMenu }          from '../models';
import { FeMenusState }    from '../reducers/femenus';
import { FeMenuActions }   from '../actions';
import { AlertActions }    from '../actions';

@Injectable()
export class FeMenuEffects {
    cache = CacheSingleton.getInstance();

    constructor(private actions$: Actions,
                private http: Http) { }


    get headers() {
        return new Headers({
            'Authorization': 'Bearer ' + this.cache.token,
            'Content-Type': 'application/json'
        });
    }

    @Effect() loadAll$ = this.actions$.ofType(FeMenuActions.LOAD_ALL)
        .switchMap(() => this.getAll()
            .map(menus => FeMenuActions.loadAllSuccess(menus))
            .catch(() => Observable.of(FeMenuActions.loadAllFail()))
        );

    @Effect() saveMenu$ = this.actions$.ofType(FeMenuActions.SAVE_MENU)
        .switchMap(action => this.putMenu(action.payload)
            .map(() => AlertActions.success("保存目录成功"))
            .catch(() => Observable.of(AlertActions.error("保存目录失败")))
        );

    @Effect() addMenu$ = this.actions$.ofType(FeMenuActions.ADD_MENU)
        .switchMap(action => this.postMenu(action.payload)
            .map(() => AlertActions.success("新增目录成功"))
            .catch(() => Observable.of(AlertActions.error("新增目录失败")))
        );

    @Effect() deleteMenu$ = this.actions$.ofType(FeMenuActions.DELETE_MENU)
        .switchMap(action => this.deleteMenu(action.payload)
            .map(() => AlertActions.success("删除目录成功"))
            .catch(() => Observable.of(AlertActions.error("删除目录失败")))
        );

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions

    // Get all desktop and mobile frontend menus
    private getAll(): Observable<FeMenusState> {
        let api = APIS[this.cache.key] + API_PATH.fe_menus +
            '?token=' + this.cache.token;
        return this.http.get(api).map(res => res.json());
    }

    private putMenu(menu: FeMenu) {
        let body = JSON.stringify(menu);
        let options = new RequestOptions({ headers: this.headers });

        let api = APIS[this.cache.key] + API_PATH.fe_menus + '/' + menu.id;
        return this.http.put(api, body, options).map(res => res.json());
    }

    private postMenu(menu: FeMenu) {
        let body = JSON.stringify(menu);
        let options = new RequestOptions({ headers: this.headers });

        let api = APIS[this.cache.key] + API_PATH.fe_menus;
        return this.http.post(api, body, options).map(res => res.json());
    }

    private deleteMenu(menu: FeMenu) {
        let options = new RequestOptions({ headers: this.headers });

        let api = APIS[this.cache.key] + API_PATH.fe_menus + '/' + menu.id;
        return this.http.delete(api, options).map(res => res.json());
    }
}
