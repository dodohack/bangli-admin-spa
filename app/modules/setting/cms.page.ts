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
    @ViewChild('modalEdit')   modalEdit;
    
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
    
    actionType: string; // 'add' or 'edit' a tax

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {}

    ngOnInit() {
        this.subCms = this.store.select<CmsAttrsState>('cms')
            .subscribe(cmsState => {
                this.tags = cmsState.tags;
                this.cats = cmsState.categories;
                this.channels = cmsState.channels;
                this.doFilterCats();
            });

        this.subParams = this.route.params.subscribe(params => {
            this.taxType = params['taxonomy'];
            this.channel = this.channels.filter(c => c.slug === params['channel'])[0];
            this.doFilterCats();
        });
    }

    ngOnDestroy() {
        this.subCms.unsubscribe();
        this.subParams.unsubscribe();
    }

    // Filter categories for given channel when url changes
    doFilterCats() {
        if (this.channel)
            this.filteredCats = this.cats
                .filter(t => t.channel_id === this.channel.id);        
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
