/**
 * Post category, tag, topic cloud, shared by post list and post single page
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy }                from "@angular/core";

import { Entity }      from '../../models';
import { Category }    from '../../models';
//import { Topic }       from '../../models';
import { GeoLocation } from '../../models';
import { TopicType }   from '../../models';

@Component({
    selector: 'entity-attr-cloud',
    template: require('./entity-attr-cloud.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityAttrCloud {
    @Input() isTopic:    boolean;
    @Input() categories: Category[];
    @Input() topics:     Entity[];
    @Input() locations:  GeoLocation[];
    @Input() topicTypes: TopicType[];

    //@Input() topicProductSeries: Topic[];
    //@Input() topicTopicSeries:   Topic[];
    //@Input() topicPostSeries:    Topic[];

    @Output() toggle            = new EventEmitter();
    @Output() deleteCat         = new EventEmitter();
    @Output() deleteTag         = new EventEmitter();
    @Output() deleteTopic       = new EventEmitter();
    @Output() toggleGeoLocation = new EventEmitter();
    @Output() deleteTopicProductSeries = new EventEmitter();
    @Output() deleteTopicTopicSeries   = new EventEmitter();
    @Output() deleteTopicPostSeries    = new EventEmitter();

    get hasLocation() { return this.locations && this.locations.length > 0; }

    // Get topics of given topic type
    topicsOfType(ttype: TopicType) {
        return this.topics.filter(t => t.type_id === ttype.id);
    }
}
