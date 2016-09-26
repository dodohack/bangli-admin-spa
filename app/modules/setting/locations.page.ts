/**
 * Geo locations settings
 */
import { Component, ViewChild } from '@angular/core';
import { OnInit, OnDestroy }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { Store }                from '@ngrx/store';

import { AppState }          from '../../reducers';

@Component({ template: require('./locations.page.html') })
export class LocationsPage implements OnInit, OnDestroy
{
    subQParams: any;
    
    // Current current we are managing
    country: string;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {}

    ngOnInit() {
        this.subQParams = this.route.queryParams
            .subscribe(params => {
                this.country = params['country'];
            }) ;
    }

    ngOnDestroy() {
        this.subQParams.unsubscribe();
    }
}
