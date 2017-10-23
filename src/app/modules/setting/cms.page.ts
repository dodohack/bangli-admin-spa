/**
 * Cms setting page, entry point of all cms settings
 */
import { Component, ViewChild } from '@angular/core';
import { OnInit, OnDestroy }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { Store }                from '@ngrx/store';
import { Observable }           from 'rxjs/Observable';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Tag }               from "../../models";
import { Category }          from "../../models";
import { Topic }             from "../../models";
import { TopicType }         from "../../models";
import { Channel }           from "../../models";
import * as CmsAttrActions   from "../../actions/cmsattr";
import { ModalEditTax }      from '../directives/modal-edit-tax';

import {
    AppState,
    getCmsCurChannel,
    getCmsChannels,
    getCmsCurChannelCategories,
    getCmsCurChannelTopicTypes } from '../../reducers';


@Component({ templateUrl: './cms.page.html' })
export class CmsPage implements OnInit, OnDestroy
{
    dialogRef: MatDialogRef<ModalEditTax> | null;

    // Popup modal
    @ViewChild('modalEdit')   modalEdit;

    // Current active cms channel
    channel$:    Observable<Channel>;
    // All cms channels
    channels$:   Observable<Channel[]>;
    // Cms categories of current active channel
    categories$: Observable<Category[]>;
    // Cms topic types of current active channel
    topicTypes$: Observable<TopicType[]>;

    channels: Channel[];
    categories: Category[];

    subParams: any;
    subPCh: any;
    subChs: any;
    subCat: any;

    tax: any; // object of 'category', 'tag' or 'topic'
    taxType: string; // one of 'category', 'tag' or 'topic'

    actionType: string; // 'add' or 'edit' a tax

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>,
                private dialog: MatDialog) {}

    ngOnInit() {
        this.channel$    = this.store.select(getCmsCurChannel);
        this.channels$   = this.store.select(getCmsChannels);
        this.categories$ = this.store.select(getCmsCurChannelCategories);
        this.topicTypes$ = this.store.select(getCmsCurChannelTopicTypes);

        this.subChs = this.channels$.subscribe(chs => this.channels = chs);
        this.subCat = this.categories$.subscribe(cat => this.categories= cat);

        // Change current active channel when channel changes in url
        this.subPCh = this.route.params.map(p => p['channel'])
            .subscribe(slug =>
                this.store.dispatch(new CmsAttrActions.SwitchChannel(slug)));

        this.subParams = this.route.params.subscribe(params => {
            this.taxType = params['taxonomy'];
        });
    }

    ngOnDestroy() {
        this.subPCh.unsubscribe();
        this.subParams.unsubscribe();
        this.subChs.unsubscribe();
        this.subCat.unsubscribe();
    }

    onEdit($event) {
        this.tax = $event;
        this.actionType = 'edit';
        this.openDialog();
    }
    
    onAdd() {
        this.tax = {name: null, slug: null, parent_id: 0, channel_id: null};
        this.actionType = 'add';
        this.openDialog();
    }

    /**
     * Delete a taxonomy 
     */
    removeTax($event) {
        if (this.taxType === 'tag')
            this.store.dispatch(new CmsAttrActions.DeleteTag($event));
        else if (this.taxType === 'category')
            this.store.dispatch(new CmsAttrActions.DeleteCategory($event));

    }

    /**
     * Create a new taxonomy 
     */
    newTax($event) {
        if (this.taxType === 'tag')
            this.store.dispatch(new CmsAttrActions.AddTag($event));
        else if (this.taxType === 'category')
            this.store.dispatch(new CmsAttrActions.AddCategory($event));
    }

    /**
     * Update an existing taxonomy 
     */
    saveTax($event) {
        if (this.taxType === 'tag')
            this.store.dispatch(new CmsAttrActions.SaveTag($event));
        else if (this.taxType === 'category')
            this.store.dispatch(new CmsAttrActions.SaveCategory($event));
    }

    openDialog() {
        // Open modal tax editor and pass in data
        this.dialogRef = this.dialog.open(ModalEditTax, {
            width: '400px',
            data: {
                actionType: this.actionType,
                taxType: this.taxType,
                categories: this.categories,
                channels: this.channels,
                tax: this.tax,
            }
        });

        // Get modified data back.
        this.dialogRef.beforeClose().filter(r => typeof r !== 'undefined')
            .subscribe((result: {action: string, data: any}) => {
                console.log("RESULT: ", result);
                switch(result.action) {
                    case 'add':
                        return this.newTax(result.data);
                    case 'save':
                        return this.saveTax(result.data);
                    case 'remove':
                        return this.removeTax(result.data);
                }
            });
    }
}
