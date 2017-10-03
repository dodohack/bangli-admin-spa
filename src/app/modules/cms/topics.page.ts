/**
 * This is the topic list management page component
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
import { getTopicStates }    from '../../reducers';

@Component({ templateUrl: './topics.page.html' })
export class TopicsPage extends EntitiesPage
{
    topicStates$: Observable<any>;
    
    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router) {
        super(ENTITY.CMS_TOPIC, route, store, router);
        
        this.topicStates$ = this.store.select(getTopicStates);
    }

    get zh() { return zh_CN.cms; }
}
