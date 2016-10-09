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
import { Ping }              from '../../ping';
import { zh_CN }             from '../../localization';

import { getPageStates }     from '../../reducers';

@Component({ template: require('./pages.page.html') })
export class PagesPage extends EntitiesPage
{
    pageStates$:  Observable<any>;
    
    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router,
                protected ping:  Ping) { 
        super(ENTITY.CMS_PAGE, route, router, store, ping);
        
        this.pageStates$ = this.store.let(getPageStates());        
    }

    get zh() { return zh_CN.cms; }
}
