/**
 * This is the post list management page component
 */

import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';

import { EntitiesPage }      from '../base/entities.page';
import { ENTITY }            from '../../models';
import { AppState }          from '../../reducers';
import { Ping }              from '../../ping';
import { zh_CN }             from '../../localization';

import { getPostStates } from '../../reducers';

@Component({ template: require('./posts.page.html') })
export class PostsPage extends EntitiesPage
{
    postStates$:  Observable<any>;
    
    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router,
                protected ping: Ping) {
        super(ENTITY.CMS_POST, route, router, store, ping);
        
        this.postStates$    = this.store.let(getPostStates());        
    }

    get zh() { return zh_CN.cms; }
}
