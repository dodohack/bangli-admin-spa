/**
 * Cms setting page, entry point of all cms settings
 */
import { Component, ViewChild } from '@angular/core';
import { OnInit, OnDestroy }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { Store }                from '@ngrx/store';

import { AppState }          from '../../../reducers';
import { CmsAttrsState }     from "../../../reducers/cmsattrs";
import { Tag }               from "../../../models";
import { Category }          from "../../../models";
import { Topic }             from "../../../models";
import { Channel }           from "../../../models";
import {CmsAttrActions} from "../../../actions/cmsattr";

@Component({ template: require('./cms.setting.html') })
export class CmsSetting implements OnInit, OnDestroy
{
    // Popup modals
    @ViewChild('modalAdd')    modalAdd;
    @ViewChild('modalEdit')   modalEdit;
    @ViewChild('modalDelete') modalDelete;
    
    subCms: any;
    subParams: any;
    
    cmsState: CmsAttrsState;

    tax: any; // object of 'category', 'tag' or 'topic'
    taxType: string; // one of 'category', 'tag' or 'topic'
    channel: Channel;  // one of 7 cms channels

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {}

    ngOnInit() {
        this.subCms = this.store.select<CmsAttrsState>('cms')
            .subscribe(cmsState => this.cmsState = cmsState);

        this.subParams = this.route.params.subscribe(params => {
            this.taxType = params['taxonomy'];
            this.channel =  this.cmsState.channels
                .filter(c => c.slug === params['channel'])[0];
        });
    }

    ngOnDestroy() {
        this.subCms.unsubscribe();
        this.subParams.unsubscribe();
    }
    
    get channels() { return this.cmsState.channels; }

    get tags() { return this.cmsState.tags
        .filter(t => t.channel_id === this.channel.id); }
    
    get cats() { return this.cmsState.categories
        .filter(c => c.channel_id === this.channel.id); }
    
    get topics() { return this.cmsState.post_topic_cats
        .filter(t => t.channel_id === this.channel.id); }
    
    addTax() {
        this.modalAdd.show();
    }
    
    editTax($event) {
        this.tax = $event;
        console.log("Edit tag: ", $event);
        this.modalEdit.show();
    }
    
    removeTax($event) {
        this.tax = $event;
        this.modalDelete.show();
    }

    saveNewTax($event) {
        console.log("Saving new tax: ", $event);
        this.dispatchSaveAction($event);
        this.modalAdd.hide();
    }

    saveTax($event) {
        console.log("Saving tax: ", $event);
        this.dispatchSaveAction($event);
        this.modalEdit.hide();
    }
    
    deleteTax($event) {
        if (this.taxType === 'tag')
            this.store.dispatch(CmsAttrActions.deleteTag($event));
        else if (this.taxType === 'category')
            this.store.dispatch(CmsAttrActions.deleteCategory($event));        
        this.modalEdit.hide();
    }
    
    dispatchSaveAction($event) {
        if (this.taxType === 'tag')
            this.store.dispatch(CmsAttrActions.saveTag($event));
        else if (this.taxType === 'category')
            this.store.dispatch(CmsAttrActions.saveCategory($event));
    }
}
