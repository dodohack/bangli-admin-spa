/**
 * This is the ads list management page component, we don't have
 * single ads page, all ads are edited in popup modal
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
import { GMT }               from '../../helper';
import { Ping }              from '../../ping';
import { zh_CN }             from '../../localization';

@Component({ template: require('./ads.page.html') })
export class AdsPage extends EntitiesPage
{
    // Devices the advertise displays on
    devices = ['MOBILE', 'PC'];
    positions = ['TOP', 'MIDDLE', 'BOTTOM', 'SIDE'];
    locations = ['UK', 'US', 'CN', 'GLOBAL'];
    
    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router,
                protected ping: Ping) {
        super(ENTITY.ADVERTISE, route, store, router, ping);
    }

    /**
     * We have getter/setter here in order to convert the datetime to MySQL
     * compatiable one 
     */
    set startedAt(value) {
        let newDate = GMT(value);
        if (newDate != this.entity.started_at) {
            this.entity.started_at = newDate;
        }
    }
    get startedAt() { return this.entity.started_at; }

    set endedAt(value) {
        let newDate = GMT(value);
        if (newDate != this.entity.ended_at) {
            this.entity.ended_at = newDate;
        }
    }
    get endedAt() { return this.entity.ended_at; }
    
}
