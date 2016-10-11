/**
 * Display a row of entity save/publish/trash buttons
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy }                from "@angular/core";

import { Entity } from '../../models';

@Component({
    selector: 'entity-buttons',
    template: require('./entity-buttons.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityButtons {
    @Input() entityState: string;
    
    @Output() save         = new EventEmitter();
    @Output() save2Pending = new EventEmitter();
    @Output() save2Publish = new EventEmitter();
    @Output() save2Draft   = new EventEmitter();
    @Output() cancelSave   = new EventEmitter();
    
    // TODO: Add input dirty bit to check if entity is modified
    get canSave() {
        return true;
    }
    
    get canDraft() {
        return this.entityState === 'publish' || this.entityState === 'pending';
    }
    
    get canPublish() {
        return this.entityState !== 'publish';
    }
}