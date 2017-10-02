/**
 * Display entity attributes except tag/topic/category/location which are 
 * displayed in entity-attr-cloud
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy }                from "@angular/core";

import { Entity }    from '../../models';
import { TopicType } from '../../models';
import { Channel }   from '../../models';
import { User }      from '../../models';
import { zh_CN }     from '../../localization';

@Component({
    selector: 'entity-attributes',
    template: require('./entity-attributes.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityAttributes {
    @Input() authorId: number;
    @Input() editorId: number;
    @Input() creativeType: string;
    @Input() topicTypeId: number;  // Topic type id of current topic
    @Input() channelId: number;    // Channel id of current topic
    @Input() authors: User[];
    @Input() editors: User[];
    @Input() creativeTypes: any;
    @Input() topicTypes: TopicType[];
    @Input() channels: Channel[];
    @Input() hasDeal: boolean;

    @Output() authorChange = new EventEmitter();
    @Output() editorChange = new EventEmitter();
    @Output() creativeTypeChange = new EventEmitter();
    @Output() channelChange   = new EventEmitter();
    @Output() topicTypeChange = new EventEmitter();
    @Output() hasDealChange   = new EventEmitter();

    get zh() { return zh_CN.cms; }
}
