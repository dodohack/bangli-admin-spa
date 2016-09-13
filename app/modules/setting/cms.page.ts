/**
 * Cms setting page, entry point of all cms settings
 */
import { Component, ViewChild } from '@angular/core';
import { OnInit, OnDestroy }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { Store }                from '@ngrx/store';

import { AppState }          from '../../reducers';
import { CmsAttrsState }     from "../../reducers/cmsattrs";
import { Tag }               from "../../models";
import { Category }          from "../../models";
import { Topic }             from "../../models";
import { Channel }           from "../../models";
import { CmsAttrActions }    from "../../actions/cmsattr";

@Component({ template: require('./cms.page.html') })
export class CmsPage implements OnInit, OnDestroy
{
    // Popup modals
    @ViewChild('modalAdd')    modalAdd;
    @ViewChild('modalEdit')   modalEdit;
    @ViewChild('modalDelete') modalDelete;
    
    subCms: any;
    subParams: any;

    filteredTags: Tag[];
    filteredCats: Category[];
    tags: Tag[];
    cats: Category[];
    channels: Channel[];

    tax: any; // object of 'category', 'tag' or 'topic'
    taxType: string; // one of 'category', 'tag' or 'topic'
    channel: Channel;  // one of 7 cms channels

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {}

    ngOnInit() {
        this.subCms = this.store.select<CmsAttrsState>('cms')
            .subscribe(cmsState => {
                this.tags = cmsState.tags;
                this.cats = cmsState.categories;
                this.channels = cmsState.channels;
            });

        this.subParams = this.route.params.subscribe(params => {
            this.taxType = params['taxonomy'];
            this.channel = this.channels.filter(c => c.slug === params['channel'])[0];
            this.filteredTags = this.tags.filter(t => t.channel_id === this.channel.id);
            this.filteredCats = this.cats.filter(t => t.channel_id === this.channel.id);
        });
    }

    ngOnDestroy() {
        this.subCms.unsubscribe();
        this.subParams.unsubscribe();
    }

    /**
     * Delete a taxonomy 
     */
    removeTax($event) {
        if (this.taxType === 'tag')
            this.store.dispatch(CmsAttrActions.deleteTag($event));
        else if (this.taxType === 'category')
            this.store.dispatch(CmsAttrActions.deleteCategory($event));
    }

    /**
     * Create a new taxonomy 
     */
    newTax($event) {
        if (this.taxType === 'tag')
            this.store.dispatch(CmsAttrActions.addTag($event));
        else if (this.taxType === 'category')
            this.store.dispatch(CmsAttrActions.addCategory($event));
        
        this.modalAdd.hide();
    }

    /**
     * Update an existing taxonomy 
     */
    saveTax($event) {
        console.log("this.tax: ", this.tax);
        console.log("Saving tax: ", $event);
        if (this.taxType === 'tag')
            this.store.dispatch(CmsAttrActions.saveTag($event));
        else if (this.taxType === 'category')
            this.store.dispatch(CmsAttrActions.saveCategory($event));
        
        this.modalEdit.hide();
    }
}
