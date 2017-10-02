/**
 * Edit a new geo location, we are going to add froala support to the
 * popup modal.
 */
import { Component }         from '@angular/core';
import { Input, Output }     from '@angular/core';
import { EventEmitter }      from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { GeoLocation }       from "../../models";

@Component({
    selector: 'modal-edit-geo-loc',
    templateUrl: './modal-edit-geo-loc.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalEditGeoLoc
{
    @Input() actionType: string; // 'add' or 'edit' action on geo location
    @Input() location:  GeoLocation;
    @Input() locations: GeoLocation[];

    locType = ['CITY', 'REGION', 'COUNTRY'];

    // Popularity of the place
    rates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    @Output() add    = new EventEmitter(); // create a location
    @Output() addAndContinue = new EventEmitter(); // create a location
    @Output() save   = new EventEmitter(); // save a tax
    @Output() remove = new EventEmitter(); // delete a tax
    @Output() cancel = new EventEmitter(); // cancel operation

    get cities() { return this.locations.filter(l => l.loc_type == 'CITY'); }
}
