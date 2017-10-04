/**
 * This is the offer post list management page component
 */

import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Router }            from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { EntitiesPage }      from '../base/entities.page';
import { ENTITY }            from '../../models';
import { AppState }          from '../../reducers';
import { zh_CN }             from '../../localization';

import { getOfferStates }     from '../../reducers';

@Component({ templateUrl: './offers.page.html' })
export class OffersPage extends EntitiesPage
{
    offerStates$:  Observable<any>;

    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router) {
        super(ENTITY.OFFER, route, store, router);

        this.offerStates$ = this.store.select(getOfferStates);
    }

    get zh() { return zh_CN.cms; }
}
