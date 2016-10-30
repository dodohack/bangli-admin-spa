/**
 * Display and edit entity attributes: guid, anchor_text, website, and aff_url
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy, OnInit }        from "@angular/core";
import { FormControl }                            from '@angular/forms';

@Component({
    selector: 'entity-permalink-edit',
    template: require('./entity-permalink-edit.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityPermalinkEdit implements OnInit {
    webControl = new FormControl();
    affControl = new FormControl();

    @Input() website: string;
    @Input() affiliateUrl: string;

    @Output() websiteChange      = new EventEmitter();
    @Output() affiliateUrlChange = new EventEmitter();

    ngOnInit() {
        // Limit the rate of event emitted by input box
        this.webControl.valueChanges.debounceTime(1000)
            .filter(v => v !== this.website)
            .subscribe(v => this.websiteChange.emit(v));

        this.affControl.valueChanges.debounceTime(1000)
            .filter(v => v !== this.website)
            .subscribe(v => this.affiliateUrlChange.emit(v));
    }
}
