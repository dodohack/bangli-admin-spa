/**
 * Image and thumbnail setting page
 */
import { Component, ViewChild } from '@angular/core';
import { OnInit, OnDestroy }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { Store }                from '@ngrx/store';
import { Observable }           from 'rxjs/Observable';

import { ENTITY }               from '../../models';
import * as EntityActions       from '../../actions/entity';
import { AppState, getThumbConfig } from '../../reducers';

@Component({ templateUrl: './thumb.page.html' })
export class ThumbPage implements OnInit, OnDestroy
{
    thumbConfig$: Observable<any>;

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.thumbConfig$ = this.store.select(getThumbConfig);
    }

    ngOnDestroy() {}

    /**
     * Dispatch an action to tell api server to delete old thumbs and generate
     * new ones.
     */
    generateThumbs() {
        this.store.dispatch(new EntityActions.GenerateThumbs({etype: ENTITY.ATTACHMENT}));
    }
}
