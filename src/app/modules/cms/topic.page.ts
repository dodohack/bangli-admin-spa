/**
 *  For each topic page, we have an extra column to have offer information stored
 *  , so that when we have a topic, we will automatically create a offer topic
 *  for it.
 */

import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from "@angular/core";
import { ViewChild }         from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Location }          from '@angular/common';
import { Router }            from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from "rxjs";

import { EntityPage }        from '../base/entity.page';
import { Entity }            from '../../models';
import { ENTITY }            from '../../models';
import * as AlertActions     from '../../actions/alert';
import * as EntityActions    from '../../actions/entity';
import { AppState }          from '../../reducers';
import { zh_CN }             from '../../localization';
import { EntityParams }      from "../../models/entity";

import {
    getCurEntity,
    getEntitiesCurPage,
    getPaginator,
    getIdsCurPage
} from '../../reducers';

@Component({ templateUrl: './topic.page.html' })
export class TopicPage extends EntityPage
{
    newOffer$: Observable<Entity>;
    offers$: Observable<Entity[]>;
    offerIds$: Observable<number[]>;
    offerPager$: Observable<any>;

    constructor(protected route: ActivatedRoute,
                protected location: Location,
                protected store: Store<AppState>,
                protected router: Router) {
        super(ENTITY.TOPIC, route, location, store, router);

        this.offers$ = this.store.select(getEntitiesCurPage(ENTITY.OFFER));
        this.offerPager$ = this.store.select(getPaginator(ENTITY.OFFER));
        this.offerIds$ = this.store.select(getIdsCurPage(ENTITY.OFFER));
        this.newOffer$ = this.store.select(getCurEntity(ENTITY.OFFER));
    }

    get zh() { return zh_CN.cms; } // Localization

    get previewUrl() {
        if (this.entity && this.domain)
            return this.domain.url + '/cms/topic/' + this.entity.guid;
    }

    /**
     * When offers tab is selected, we will call this function to load offers
     * belongs to this topic
     */
    loadOffers() {
        let params: EntityParams = new EntityParams();
        params.topic = this.entity.guid;
        this.store.dispatch(new EntityActions.LoadEntities({etype: ENTITY.OFFER, data: params}));
    }
}
