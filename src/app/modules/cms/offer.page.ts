/**
 * This is the single offer post page
 */

import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from "@angular/core";
import { ViewChild }         from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Location }          from '@angular/common';
import { Router }            from '@angular/router';
import { Store }             from '@ngrx/store';

import { EntityPage }        from '../base/entity.page';
import { ENTITY }            from '../../models';
import * as AlertActions     from '../../actions/alert';
import { AppState }          from '../../reducers';
import { zh_CN }             from '../../localization';
import {Helper} from "../../helper";

@Component({ templateUrl: './offer.page.html' })
export class OfferPage extends EntityPage
{
    constructor(protected route: ActivatedRoute,
                protected location: Location,
                protected store: Store<AppState>,
                protected router: Router,
                public helper: Helper) {
        super(ENTITY.OFFER, route, location, store, router, helper);
    }

    get zh() { return zh_CN.cms; } // Localization

    get previewUrl() {
        if (this.domain && this.entity)
            return this.domain.url + '/cms/offer/' + this.entity.id;
    }
}
