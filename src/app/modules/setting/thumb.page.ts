/**
 * Image and thumbnail setting page
 */
import { Component, ViewChild } from '@angular/core';
import { OnInit, OnDestroy }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { Store }                from '@ngrx/store';
import { Observable }           from 'rxjs/Observable';

import { ENTITY }               from '../../models';
import { EntityActions }        from '../../actions';
import { AppState, getThumbConfig } from '../../reducers';

@Component({ template: require('./thumb.page.html') })
export class ThumbPage implements OnInit, OnDestroy
{
    thumbConfig$: Observable<any>;

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.thumbConfig$ = this.store.let(getThumbConfig());
    }

    ngOnDestroy() {}

    /**
     * Dispatch an action to tell api server to delete old thumbs and generate
     * new ones.
     */
    generateThumbs() {
        this.store.dispatch(EntityActions.generateThumbs(ENTITY.ATTACHMENT));
    }
}
