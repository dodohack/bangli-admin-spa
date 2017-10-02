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

import * as menu  from '../actions/femenu';
import * as alert from '../actions/alert';

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

    @Effect() loadAll$ = this.actions$.ofType(menu.LOAD_ALL)
        .switchMap(() => this.getAll()
            .map(menus => new menu.LoadAllSuccess(menus))
            .catch(() => Observable.of(new menu.LoadAllFail()))
        );

    @Effect() saveMenu$ = this.actions$.ofType(menu.SAVE_MENU)
        .switchMap(action => this.putMenu(action.payload)
            .map(() => new alert.Success("保存目录成功"))
            .catch(() => Observable.of(new alert.Error("保存目录失败")))
        );

    @Effect() addMenu$ = this.actions$.ofType(menu.ADD_MENU)
        .switchMap(action => this.postMenu(action.payload)
            .map(() => new alert.Success("新增目录成功"))
            .catch(() => Observable.of(new alert.Error("新增目录失败")))
        );

    @Effect() deleteMenu$ = this.actions$.ofType(menu.DELETE_MENU)
        .switchMap(action => this.deleteMenu(action.payload)
            .map(() => new alert.Success("删除目录成功"))
            .catch(() => Observable.of(new alert.Error("删除目录失败")))
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
