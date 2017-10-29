/**
 *  For each topic page, we have an extra column to have offer information stored
 *  , so that when we have a topic, we will automatically create a offer topic
 *  for it.
 */

import { Component }         from '@angular/core';
import { OnDestroy }         from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Location }          from '@angular/common';
import { Router }            from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from "rxjs";
import { MatDialog }         from '@angular/material';


import { EntityPage }        from '../base/entity.page';
import { Entity }            from '../../models';
import { ENTITY }            from '../../models';
import * as AlertActions     from '../../actions/alert';
import * as EntityActions    from '../../actions/entity';
import { AppState }          from '../../reducers';
import { zh_CN }             from '../../localization';
import { EntityParams }      from "../../models/entity";

import {
    getCurNewEntity,
    getEntitiesCurPage,
    getPaginator,
    getIdsCurPage
} from '../../reducers';
//import {ImageListDialog} from "../attachment/components/image.list";

@Component({ templateUrl: './topic.page.html' })
export class TopicPage extends EntityPage implements OnDestroy
{
    newOffer$: Observable<Entity>;
    offers$: Observable<Entity[]>;
    offerIds$: Observable<number[]>;
    offerPager$: Observable<any>;

    // Offer ids
    offerIds: number[];
    sub1: any;

    // If all the offer panel is expanded or not
    offerExpanded = false;

    // topic content and offers tab index
    tabIdx = 0;

    constructor(public dialog: MatDialog,
                protected route: ActivatedRoute,
                protected location: Location,
                protected store: Store<AppState>,
                protected router: Router) {
        super(ENTITY.TOPIC, route, location, store, router);

        this.offers$ = this.store.select(getEntitiesCurPage(ENTITY.OFFER));
        this.offerPager$ = this.store.select(getPaginator(ENTITY.OFFER));
        this.offerIds$ = this.store.select(getIdsCurPage(ENTITY.OFFER));
        this.newOffer$ = this.store.select(getCurNewEntity(ENTITY.OFFER));

        this.sub1 = this.offerIds$.subscribe(ids => this.offerIds = ids);
    }

    ngOnDestroy() {
        this.sub1.unsubscribe();
    }

    get zh() { return zh_CN.cms; } // Localization

    get previewUrl() {
        if (this.entity && this.domain)
            return this.domain.url + '/cms/topic/' + this.entity.guid;
    }

    get offerCount() {
        if (this.offerIds && this.offerIds.length)
            return '(' + this.offerIds.length + ')';
        return '';
    }

    /**
     * When offers tab is selected, we will call this function to load offers
     * belongs to this topic
     */
    loadOffers(idx) {
        // Only load offer when offer tab is active and entity id exists
        if (idx == 1 && this.entity.id > 0) {
            let params: EntityParams = {page: 1, per_page: 100, topic: this.entity.guid};
            this.store.dispatch(new EntityActions.LoadEntities({
                etype: ENTITY.OFFER,
                data: params
            }));
        }
    }

    /*
    openGalleryDialog(etype, baseResUrl, entities, selectedEntities,
                      idsCurPage, embeddedEditor) {
        this.dialog.open(ImageListDialog, {data: {
            etype: etype,
            baseResUrl: baseResUrl,
            entities: entities,
            selectedEntiteis: selectedEntities,
            idsCurPage: idsCurPage,
            embeddedEditor: embeddedEditor
        }});
    }
    */

    /**
     * Save an offer.
     * Always add topic id with the offer
     */
    saveWithTopicId(etype, entity, mask) {
        if (this.entity.id) {
            entity['topics'] = [{id: this.entity.id}];
            mask.push('topics');
            this.saveWithEtype(etype, entity, mask);
        }
    }

    /**
     * Move all offers into trash of physically delete them from trash
     * @param ids
     */
    deleteAllOffers() {
        if (this.offerIds && this.offerIds.length)
            this.store.dispatch(new EntityActions.BatchDeleteEntities(
                {etype: ENTITY.OFFER, data: this.offerIds}));
    }
}
