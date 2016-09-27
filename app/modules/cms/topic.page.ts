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
import { Store }             from '@ngrx/store';

import { EntityPage }        from '../base/entity.page';
import { ENTITY }            from '../../models';
import { AlertActions }      from '../../actions';
import { AppState }          from '../../reducers';
import { zh_CN }             from '../../localization';

@Component({ template: require('./topic.page.html') })
export class TopicPage extends EntityPage
{
    constructor(protected route: ActivatedRoute,
                protected location: Location,
                protected store: Store<AppState>) {
        super(ENTITY.CMS_TOPIC, route, location, store);
    }

    get zh() { return zh_CN.cms; } // Localization
}
