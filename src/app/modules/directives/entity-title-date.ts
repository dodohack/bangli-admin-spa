/**
 * Display a row with entity title and fake_publish_at datepicker
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy, OnInit }        from "@angular/core";
import { FormControl }                            from '@angular/forms';

@Component({
    selector: 'entity-title-date',
    templateUrl: './entity-title-date.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityTitleDate implements OnInit {
    titleControl  = new FormControl();
    guidControl   = new FormControl();
    descControl   = new FormControl();
    titleCNControl = new FormControl();

    @Input() isTopic: boolean;
    @Input() title: string;
    @Input() date: string;
    @Input() guid: string;
    @Input() desc: string;
    @Input() intro: string;
    @Input() titleCN: string;

    @Output() titleChange = new EventEmitter();
    @Output() dateChange  = new EventEmitter();
    @Output() guidChange  = new EventEmitter();
    @Output() descChange  = new EventEmitter();
    @Output() titleCNChange = new EventEmitter();

    // Datepicker hidden by default
    dpHidden = true;

    ngOnInit() {
        // Limit the rate of event emitted by input box
        this.titleControl.valueChanges.debounceTime(1000)
            .filter(t => t !== this.title)
            .subscribe(t => this.titleChange.emit(t));

        this.guidControl.valueChanges.debounceTime(1000)
            .filter(t => t !== this.guid)
            .subscribe(t => this.guidChange.emit(t));

        this.descControl.valueChanges.debounceTime(1000)
            .filter(t => t !== this.desc)
            .subscribe(t => this.descChange.emit(t));

        this.titleCNControl.valueChanges.debounceTime(1000)
            .filter(t => t !== this.titleCN)
            .subscribe(t => this.titleCNChange.emit(t));
    }
}
