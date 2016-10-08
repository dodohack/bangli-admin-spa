/**
 * Display entity excerpt and note
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy }                from "@angular/core";

@Component({
    selector: 'entity-excerpt-note',
    template: require('./entity-excerpt-note.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityExcerptNote {
    @Input() excerpt: string;
    @Input() note: string;

    @Output() excerptChanged = new EventEmitter();
    @Output() noteChanged    = new EventEmitter();
}
