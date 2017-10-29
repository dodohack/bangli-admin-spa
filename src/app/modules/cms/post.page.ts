/**
 * This is the single post page
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
import { ENTITY_INFO }       from '../../models';
import * as AlertActions     from '../../actions/alert';
import { AppState }          from '../../reducers';
import { zh_CN }             from '../../localization';
import {Helper} from "../../helper";

@Component({ templateUrl: './post.page.html' })
export class PostPage extends EntityPage
{
    constructor(protected route: ActivatedRoute,
                protected location: Location,
                protected store: Store<AppState>,
                protected router: Router,
                public helper: Helper) {
        super(ENTITY.POST, route, location, store, router, helper);
    }

    get zh() { return zh_CN.cms; } // Localization

    get previewUrl() {
        if (this.entity && this.domain)
            return this.domain.url + '/cms/post/' + this.entity.id;
    }
}
