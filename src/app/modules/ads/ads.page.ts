/**
 * This is the ads list management page component, we don't have
 * single ads page, all ads are edited in popup modal
 */

import { Component }         from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Router }            from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/observable';
import { EntitiesPage }      from '../base/entities.page';
import { ENTITY }            from '../../models';
import {AppState, getAdStates} from '../../reducers';
import { zh_CN }             from "../../localization/";


@Component({ templateUrl: './ads.page.html' })
export class AdsPage extends EntitiesPage
{
    adStates$: Observable<any>;

    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router) {
        super(ENTITY.ADVERTISE, route, store, router);

        this.adStates$ = this.store.select(getAdStates);

    }

    get zh() { return zh_CN.cms; }
}
