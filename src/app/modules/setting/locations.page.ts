/**
 * Geo locations settings
 */
import { Component, ViewChild } from '@angular/core';
import { OnInit, OnDestroy }    from '@angular/core';
import { Store }                from '@ngrx/store';

import {AppState, getCmsState}          from '../../reducers';
import { CmsAttrsState }     from '../../reducers/cmsattrs';
import { GeoLocation }       from '../../models';
import * as CmsAttrActions   from "../../actions/cmsattr";

@Component({ templateUrl: './locations.page.html' })
export class LocationsPage implements OnInit, OnDestroy
{
    @ViewChild('modalEdit')   modalEdit;

    locations: GeoLocation[];
    location: GeoLocation;

    actionType: string; // 'add' or 'edit' on location

    subCms: any;

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.subCms = this.store.select(getCmsState)
            .subscribe(cmsState => this.locations = cmsState.locations);
    }

    ngOnDestroy() {
        this.subCms.unsubscribe();
    }

    onEdit($event) {
        this.location = $event;
        this.actionType = 'edit';
        this.modalEdit.show();
    }

    onAdd() {
        this.location = new GeoLocation;
        this.actionType = 'add';
        this.modalEdit.show();
    }

    /**
     * Delete a location
     */
    removeGeoLocation($event) {
        this.store.dispatch(new CmsAttrActions.DeleteGeoLocation($event));
        this.modalEdit.hide();
    }

    /**
     * Create a new location
     */
    newGeoLocation($event) {
        this.store.dispatch(new CmsAttrActions.AddGeoLocation($event));
        this.modalEdit.hide();
    }

    /**
     * Create a new location and continue create
     */
    newGeoLocationAndContinue($event) {
        this.newGeoLocation($event);
        this.onAdd();
    }

    /**
     * Update an existing location
     */
    saveGeoLocation($event) {
        this.store.dispatch(new CmsAttrActions.SaveGeoLocation($event));
        this.modalEdit.hide();
    }
}
