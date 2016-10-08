/**
 * Display entity thumbnail(s)
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy }                from "@angular/core";

import { Entity } from '../../models';

@Component({
    selector: 'entity-thumbnails',
    template: require('./entity-thumbnails.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityThumbnails {
    @Input() entity: Entity;
}