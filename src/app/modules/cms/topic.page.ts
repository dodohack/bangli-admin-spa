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

    get offersTabName() {
        if (this.entity)
            return '优惠 (' + this.entity.offers_count + ')';
    }
}
