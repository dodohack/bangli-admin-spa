/**
 * This is the post list management page component
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

import { getPostStates } from '../../reducers';

@Component({ templateUrl: './posts.page.html' })
export class PostsPage extends EntitiesPage
{
    postStates$:  Observable<any>;
    
    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router) {
        super(ENTITY.POST, route, store, router);

        this.postStates$    = this.store.select(getPostStates);
    }

    get zh() { return zh_CN.cms; }
}
