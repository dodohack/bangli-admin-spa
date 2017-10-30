/**
 * Display and edit entity attributes: guid, anchor_text, website, and aff_url
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy, OnInit, OnDestroy } from "@angular/core";
import { FormControl }                            from '@angular/forms';

@Component({
    selector: 'entity-permalink-edit',
    templateUrl: './entity-permalink-edit.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityPermalinkEdit implements OnInit, OnDestroy {
    sub1: any;
    sub2: any;
    sub3: any;
    sub4: any;

    webControl   = new FormControl();
    affControl   = new FormControl();
    affIdControl = new FormControl();
    affPfControl = new FormControl();

    @Input() website: string;
    @Input() affiliateUrl: string;
    @Input() affId: number;
    @Input() affPlatform: number;

    @Output() websiteChange      = new EventEmitter();
    @Output() affiliateUrlChange = new EventEmitter();
    @Output() affIdChange        = new EventEmitter();
    @Output() affPlatformChange   = new EventEmitter();

    platforms = [
        {key: "AWIN",      name: "Affiliate Window"},
        {key: "LINKSHARE", name: "Linkshare"},
        {key: "WEBGAIN",   name: "Webgain"}
    ];

    ngOnInit() {
        // Limit the rate of event emitted by input box
        this.sub1 = this.webControl.valueChanges.debounceTime(1000)
            .filter(v => v !== this.website)
            .subscribe(v => this.websiteChange.emit(v));

        this.sub2 = this.affControl.valueChanges.debounceTime(1000)
            .filter(v => v !== this.affiliateUrl)
            .subscribe(v => this.affiliateUrlChange.emit(v));

        this.sub3 = this.affIdControl.valueChanges.debounceTime(1000)
            .filter(v => v !== this.affId)
            .subscribe(v => this.affIdChange.emit(v));

        this.sub4 = this.affPfControl.valueChanges.debounceTime(1000)
            .filter(v => v !== this.affPlatform)
            .subscribe(v => this.affPlatformChange.emit(v));
    }

    ngOnDestroy() {
        this.sub1.unsubscribe();
        this.sub2.unsubscribe();
        this.sub3.unsubscribe();
        this.sub4.unsubscribe();
    }

}
