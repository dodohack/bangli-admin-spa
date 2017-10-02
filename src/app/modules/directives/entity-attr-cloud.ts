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
    templateUrl: './entity-attr-cloud.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityAttrCloud {
    @Input() isTopic:    boolean;
    @Input() categories: Category[];
    @Input() topics:     Entity[];
    @Input() location:   GeoLocation;
    @Input() topicTypes: TopicType[];

    @Output() toggle            = new EventEmitter();
    @Output() detachCat         = new EventEmitter();
    @Output() detachTag         = new EventEmitter();
    @Output() detachTopic       = new EventEmitter();
    @Output() updateLocation    = new EventEmitter();

    // Get topics of given topic type
    topicsOfType(ttype: TopicType) {
        return this.topics.filter(t => t.type_id === ttype.id);
    }
}
