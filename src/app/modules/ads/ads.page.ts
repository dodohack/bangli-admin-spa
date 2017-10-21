/**
 * This is the ads list management page component, we don't have
 * single ads page, all ads are edited in popup modal
 */

import { Component }         from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Router }            from '@angular/router';
import { Store }             from '@ngrx/store';

import { EntitiesPage }      from '../base/entities.page';
import { ENTITY }            from '../../models';
import { AppState }          from '../../reducers';


@Component({ templateUrl: './ads.page.html' })
export class AdsPage extends EntitiesPage
{

    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router) {
        super(ENTITY.ADVERTISE, route, store, router);
    }

}
