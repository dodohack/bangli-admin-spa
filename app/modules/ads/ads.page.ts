/**
 * This is the ads list management page component, we don't have
 * single ads page, all ads are edited in popup modal
 */

import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { EntitiesPage }      from '../base/entities.page';
import { ENTITY }            from '../../models';
import { AppState }          from '../../reducers';
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
                protected ping: Ping) {
        super(ENTITY.ADVERTISE, route, store, ping);
    }
}
