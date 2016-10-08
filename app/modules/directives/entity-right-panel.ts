/**
 * Display entity right panel
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy }                from "@angular/core";

import { GeoLocation } from '../../models';
import { Channel }     from '../../models';
import { Category }    from '../../models';
import { Topic }       from '../../models';

@Component({
    selector: 'entity-right-panel',
    template: require('./entity-right-panel.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityRightPanel {
    @Input() channel: Channel;
    
    @Input() locations: GeoLocation[];
    @Input() categories: Category[];
    @Input() selectedCats: Category[];
    @Input() selectedTopics: Topic[];
    
    @Output() categoryChanged = new EventEmitter();
    @Output() addTopic        = new EventEmitter();
    @Output() removeTopic     = new EventEmitter();
    @Output() locationChanged = new EventEmitter();
}
