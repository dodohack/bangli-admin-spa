/**
 * This is the comments list page
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

@Component({ templateUrl: './comments.page.html' })
export class CommentsPage extends EntitiesPage
{
    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router) {
        super(ENTITY.COMMENT, route, store, router);
    }
}
