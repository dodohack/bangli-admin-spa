/**
 * This is the component that renders geo-locations in grouped countries and regions
 */
import { Component, EventEmitter, OnInit } from '@angular/core';
import { ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Input, Output }           from '@angular/core';
import { FormControl }             from '@angular/forms';

import { GeoLocation }                from '../../models';

@Component({
    selector: 'geo-location-cloud',
    template: require('./geo-location-cloud.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoLocationCloud implements OnInit {
    filterControl = new FormControl();
    filterText: string = '';
    filteredCities: GeoLocation[] = [];

    // All geo-locations
    @Input() locations: GeoLocation[];

    @Output() clickEvent = new EventEmitter();

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.filterControl.valueChanges
            .debounceTime(100).subscribe(text => {
            this.filterText = text;
            this.filteredCities = this.cities.filter(t =>
                (t.name.includes(text) || t.name_cn.includes(text)) ? true : false);
            this.cd.markForCheck();
        });
    }

    get countries() { return this.locations.filter(c => c.loc_type === "COUNTRY"); }
    get regions() { return this.locations.filter(c => c.loc_type === "REGION"); }
    get cities() { return this.locations.filter(c => c.loc_type === "CITY"); }

    citiesOfRegion(region: GeoLocation) { return this.cities.filter(c => c.parent_id === region.id); }
    regionsOfCountry(country: GeoLocation) { return this.regions.filter(r => r.parent_id === country.id); }
    citiesOfCountry(country: GeoLocation) { return this.cities.filter(c => c.parent_id === country.id); }
    areaOfCity(city: GeoLocation) { return this.cities.filter(c => c.parent_id === city.id); }

}
