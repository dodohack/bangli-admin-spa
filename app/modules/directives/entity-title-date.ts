/**
 * Display a row with entity title and fake_publish_at datepicker
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy, OnInit }        from "@angular/core";
import { FormControl }                            from '@angular/forms';

@Component({
    selector: 'entity-title-date',
    template: require('./entity-title-date.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityTitleDate implements OnInit {
    titleControl    = new FormControl();
    keywordsControl = new FormControl();
    descControl     = new FormControl();

    @Input() isTopic: boolean;
    @Input() title: string;
    @Input() date: string;
    @Input() keywords: string;
    @Input() desc: string;
    @Input() intro: string;

    @Output() titleChange = new EventEmitter();
    @Output() dateChange  = new EventEmitter();
    @Output() keywordsChange = new EventEmitter();
    @Output() descChange  = new EventEmitter();

    // Datepicker hidden by default
    dpHidden = true;

    ngOnInit() {
        // Limit the rate of event emitted by input box
        this.titleControl.valueChanges.debounceTime(1000)
            .subscribe(text => this.titleChange.emit(text));
        this.keywordsControl.valueChanges.debounceTime(1000)
            .subscribe(text => this.keywordsChange.emit(text));
        this.descControl.valueChanges.debounceTime(1000)
            .subscribe(text => this.descChange.emit(text));
    }
}
