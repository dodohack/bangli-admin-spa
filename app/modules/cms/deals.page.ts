/**
 * This is the deal post list management page component
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
import { Ping }              from '../../ping';
import { zh_CN }             from '../../localization';

@Component({ template: require('./deals.page.html') })
export class DealsPage extends EntitiesPage
{
    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router,
                protected ping: Ping) {
        super(ENTITY.CMS_DEAL, route, router, store, ping);
    }

    get zh() { return zh_CN.cms; }
}
