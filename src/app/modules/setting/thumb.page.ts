/**
 * Image and thumbnail setting page
 */
import { Component, ViewChild } from '@angular/core';
import { OnInit, OnDestroy }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { Store }                from '@ngrx/store';
import { Observable }           from 'rxjs/Observable';

import { Helper }               from '../../helper';
import { ENTITY }               from '../../models';
import * as EntityActions       from '../../actions/entity';
import { AppState, getThumbConfig, getIsLoading } from '../../reducers';


@Component({ templateUrl: './thumb.page.html' })
export class ThumbPage implements OnInit, OnDestroy
{
    // Image uploaded date range
    starts: string = null;
    ends: string = null;

    isRunning$: Observable<any>;
    thumbConfig$: Observable<any>;

    constructor(protected helper: Helper,
                protected store: Store<AppState>) {}

    ngOnInit() {
        this.isRunning$   = this.store.select(getIsLoading(ENTITY.ATTACHMENT));
        this.thumbConfig$ = this.store.select(getThumbConfig);
    }

    ngOnDestroy() {}

    /**
     * Dispatch an action to tell api server to delete old thumbs and generate
     * new ones.
     */
    generateThumbs() {
        this.store.dispatch(new EntityActions.GenerateThumbs({
            etype: ENTITY.ATTACHMENT,
            data: {starts: this.starts, ends: this.ends
            }}));
    }
}
