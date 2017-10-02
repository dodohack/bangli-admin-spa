import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy }                from "@angular/core";

import { Entity } from '../../models';

@Component({
    selector: 'entity-content',
    templateUrl: './entity-content.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityContent {
    @Input() content: string;
    
    @Output() contentChanged = new EventEmitter();
}
