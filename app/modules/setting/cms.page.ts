/**
 * Cms setting page, entry point of all cms settings
 */
import { Component, ViewChild } from '@angular/core';
import { OnInit, OnDestroy }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { Store }                from '@ngrx/store';
import { Observable }           from 'rxjs/Observable';

import { Tag }               from "../../models";
import { Category }          from "../../models";
import { Topic }             from "../../models";
import { TopicType }         from "../../models";
import { Channel }           from "../../models";
import { CmsAttrActions }    from "../../actions/cmsattr";

import {
    AppState,
    getCmsCurChannel,
    getCmsChannels,
    getCmsCurChannelCategories,
    getCmsCurChannelTopicTypes } from '../../reducers';


@Component({ template: require('./cms.page.html') })
export class CmsPage implements OnInit, OnDestroy
{
    // Popup modals
    @ViewChild('modalEdit')   modalEdit;

    // Current active cms channel
    channel$:    Observable<Channel>;
    // All cms channels
    channels$:   Observable<Channel[]>;
    // Cms categories of current active channel
    categories$: Observable<Category[]>;
    // Cms topic types of current active channel
    topicTypes$: Observable<TopicType[]>;

    subCms: any;
    subParams: any;
    subPCh: any;

    tax: any; // object of 'category', 'tag' or 'topic'
    taxType: string; // one of 'category', 'tag' or 'topic'

    actionType: string; // 'add' or 'edit' a tax

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {}

    ngOnInit() {
        this.channel$    = this.store.let(getCmsCurChannel());
        this.channels$   = this.store.let(getCmsChannels());
        this.categories$ = this.store.let(getCmsCurChannelCategories());
        this.topicTypes$ = this.store.let(getCmsCurChannelTopicTypes());

        // Change current active channel when channel changes in url
        this.subPCh = this.route.params.map(p => p['channel'])
            .subscribe(slug =>
                this.store.dispatch(CmsAttrActions.switchChannel(slug)));

        this.subParams = this.route.params.subscribe(params => {
            this.taxType = params['taxonomy'];
        });
    }

    ngOnDestroy() {
        this.subPCh.unsubscribe();
        this.subParams.unsubscribe();
    }

    onEdit($event) {
        this.tax = $event;
        this.actionType = 'edit';
        this.modalEdit.show();
    }
    
    onAdd() {
        this.tax = {name: null, slug: null, parent_id: 0, channel_id: null};
        this.actionType = 'add';
        this.modalEdit.show();        
    }

    /**
     * Delete a taxonomy 
     */
    removeTax($event) {
        if (this.taxType === 'tag')
            this.store.dispatch(CmsAttrActions.deleteTag($event));
        else if (this.taxType === 'category')
            this.store.dispatch(CmsAttrActions.deleteCategory($event));
        
        this.modalEdit.hide();
    }

    /**
     * Create a new taxonomy 
     */
    newTax($event) {
        if (this.taxType === 'tag')
            this.store.dispatch(CmsAttrActions.addTag($event));
        else if (this.taxType === 'category')
            this.store.dispatch(CmsAttrActions.addCategory($event));

        this.modalEdit.hide();        
    }

    /**
     * Update an existing taxonomy 
     */
    saveTax($event) {
        if (this.taxType === 'tag')
            this.store.dispatch(CmsAttrActions.saveTag($event));
        else if (this.taxType === 'category')
            this.store.dispatch(CmsAttrActions.saveCategory($event));

        this.modalEdit.hide();
    }
}
