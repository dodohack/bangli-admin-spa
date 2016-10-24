/**
 *  For each topic page, we have an extra column to have deal information stored
 *  , so that when we have a topic, we will automatically create a deal topic
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
import { AlertActions }      from '../../actions';
import { AppState }          from '../../reducers';
import { zh_CN }             from '../../localization';

@Component({ template: require('./topic.page.html') })
export class TopicPage extends EntityPage
{
    constructor(protected route: ActivatedRoute,
                protected location: Location,
                protected store: Store<AppState>,
                protected router: Router) {
        super(ENTITY.CMS_TOPIC, route, location, store, router);
    }

    get zh() { return zh_CN.cms; } // Localization

    get previewUrl() {
        if (this.entity && this.domain)
        return this.domain.url + '/cms/topic/' + this.entity.guid; 
    }

    /************************************************************************
     * Topic only functions
     *************************************************************************/

    updateTopicType($event) {
        //this.store.dispatch();
    }

    // TODO: update cms_topics.product_series_ids
    addTopicProductSeries(topic: Entity) {}
    deleteTopicProductSeries(id: number) {
    }

    // TODO: update cms_topics.topic_series_ids
    addTopicTopicSeries(topic: Entity) {}
    deleteTopicTopicSeries(id: number) {
    }

    // TODO: update cms_topics.post_series_ids
    addTopicPostSeries(topic: Entity) {}
    deleteTopicPostSeries(id: number) {
    }

    updateKeywords($event) {

    }

    updateDesc($event) {

    }

    updateIntro($event) {

    }

    updateGuid($event) {

    }

    updateAnchorText($event) {

    }

    updateWebsite($event) {

    }

    updateAffiliateUrl($event) {

    }
}
