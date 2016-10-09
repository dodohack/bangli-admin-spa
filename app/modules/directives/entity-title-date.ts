/**
 * Display a row with entity title and fake_publish_at datepicker
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy }                from "@angular/core";

@Component({
    selector: 'entity-title-date',
    template: require('./entity-title-date.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityTitleDate {
    @Input() title: string;
    @Input() date: string;

    @Output() titleChange = new EventEmitter();
    @Output() dateChange  = new EventEmitter();
    
    // Datepicker hidden by default
    dpHidden = true;
}
