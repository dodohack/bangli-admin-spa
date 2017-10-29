/**
 * Single advertisement edit page
 */

import { Component }         from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Location }          from '@angular/common';
import { Router }            from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from "rxjs";


import { EntityPage }        from '../base/entity.page';
import { ENTITY }            from '../../models';
import * as AlertActions     from '../../actions/alert';
import { AppState }          from '../../reducers';
import { zh_CN }             from '../../localization';
import { Helper }            from '../../helper';

import { getAdPositions } from '../../reducers';

@Component({ templateUrl: './ad.page.html' })
export class AdPage extends EntityPage
{
    positions$: Observable<any>;

    locations = ['LOCAL', 'CN', 'GLOBAL'];

    constructor(public helper: Helper,
                protected route: ActivatedRoute,
                protected location: Location,
                protected store: Store<AppState>,
                protected router: Router) {
        super(ENTITY.ADVERTISE, route, location, store, router, helper);

        this.positions$ = this.store.select(getAdPositions);
    }

    get zh() { return zh_CN.cms; } // Localization

    get previewUrl() { return null; }

    /**
     * Overwrite parent::save(), simply save all entries
     */
    save() {
        this.dirtyMask = ['id','title', 'status', 'position', 'location',
            'rank', /*'channel_id', */ 'image_url', 'target_url',
            'starts', 'ends', 'description'];
        this.saveWithEtype(this.etype, this.entity, this.dirtyMask);
    }
}
