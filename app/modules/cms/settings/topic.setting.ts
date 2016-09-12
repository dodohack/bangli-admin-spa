/**
 * Cms topic settings
 */
import { Component }         from '@angular/core';
import { Input, Output }     from '@angular/core';
import { EventEmitter }      from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { Topic }             from "../../../models";
import { Channel }           from "../../../models";

@Component({
    selector: 'topic-setting',
    template: require('./topic.setting.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicSetting {
    
    @Input() topics: Topic[];
    @Input() channel:Channel;

    @Output() edit = new EventEmitter();
    @Output() remove = new EventEmitter();
    @Output() save = new EventEmitter();
}
