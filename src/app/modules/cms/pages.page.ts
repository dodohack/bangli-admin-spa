/**
 * This is the component for page list page
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
import { zh_CN }             from '../../localization';

import { getPageStates }     from '../../reducers';

@Component({ templateUrl: './pages.page.html' })
export class PagesPage extends EntitiesPage
{
    pageStates$:  Observable<any>;
    
    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router) {
        super(ENTITY.PAGE, route, store, router);
        
        this.pageStates$ = this.store.select(getPageStates);
    }

    get zh() { return zh_CN.cms; }
}
