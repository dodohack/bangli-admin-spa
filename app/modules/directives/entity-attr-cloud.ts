/**
 * Post category, tag, topic cloud, shared by post list and post single page
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy }                from "@angular/core";

import { Entity }      from '../../models';
import { Category }    from '../../models';
import { Topic }       from '../../models';
import { GeoLocation } from '../../models';

@Component({
    selector: 'entity-attr-cloud',
    template: require('./entity-attr-cloud.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityAttrCloud {
    // Deprecated
    @Input() entity: Entity;
    
    @Input() categories: Category[];
    @Input() topics:     Topic[];
    @Input() locations:  GeoLocation[];

    @Output() toggle            = new EventEmitter();
    @Output() deleteCat         = new EventEmitter();
    @Output() deleteTag         = new EventEmitter();
    @Output() deleteTopic       = new EventEmitter();
    @Output() toggleGeoLocation = new EventEmitter();
    
    get hasLocation() { return this.locations && this.locations.length > 0; }
}
