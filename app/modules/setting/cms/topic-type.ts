/**
 * Cms topic settings
 */
import { Component }         from '@angular/core';
import { Input, Output }     from '@angular/core';
import { EventEmitter }      from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { TopicType }         from "../../../models";
import { Channel }           from "../../../models";

@Component({
    selector: 'cms-topic-setting',
    template: require('./topic-type.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmsTopicType {
    
    @Input() channel: Channel;
    @Input() topicTypes: TopicType[];

    @Output() edit = new EventEmitter();
    @Output() remove = new EventEmitter();
    @Output() save = new EventEmitter();
}
