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

import { EntityPage }        from '../base/entity.page';
import { Entity }            from '../../models';
import { ENTITY }            from '../../models';
import * as AlertActions     from '../../actions/alert';
import * as EntityActions    from '../../actions/entity';
import { AppState }          from '../../reducers';
import { zh_CN }             from '../../localization';

@Component({ templateUrl: './topic.page.html' })
export class TopicPage extends EntityPage
{
    isNewOffer: boolean = false;

    constructor(protected route: ActivatedRoute,
                protected location: Location,
                protected store: Store<AppState>,
                protected router: Router) {
        super(ENTITY.TOPIC, route, location, store, router);
    }

    get zh() { return zh_CN.cms; } // Localization

    get previewUrl() {
        if (this.entity && this.domain)
            return this.domain.url + '/cms/topic/' + this.entity.guid;
    }

    //
    // FIXME: We should avoid attach a new offer to a topic, instead,
    // we should create a offer entity and attach topic to the offer entity.
    // and then reload topic entity.
    //
    newOffer() {
        this.isNewOffer = true;
        let offer = new Entity;
        offer.id = 0;
        // FIXME: Dummy user:
        let user: any = {id: 1, display_name: 'Aries'};
        // Create offer entity
        this.store.dispatch(new EntityActions.NewEntity({etype: ENTITY.OFFER, data: user}));
        /*
        this.store.dispatch(new EntityActions.Attach(
            {etype: this.etype, key: 'offers', value: offer})
        );
        */
    }

    // TODO: mask
    saveNewOffer(offer) {
        // Save newly created offer
       this.store.dispatch(new EntityActions.SaveEntity(
           {etype: ENTITY.OFFER, data: offer, mask: []})
       );
    }

    // TODO
    reloadTopicAfterNewOfferSaved() {
        // Reload current topic
    }
}
