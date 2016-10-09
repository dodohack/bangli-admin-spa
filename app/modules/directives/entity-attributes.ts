/**
 * Display entity attributes except tag/topic/category/location which are 
 * displayed in entity-attr-cloud
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy }                from "@angular/core";

import { Entity }  from '../../models';
import { Channel } from '../../models';
import { User }    from '../../models';
import { zh_CN }   from '../../localization';

@Component({
    selector: 'entity-attributes',
    template: require('./entity-attributes.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityAttributes {
    @Input() authorId: number;
    @Input() editorId: number;
    @Input() creativeType: string;
    @Input() channelId: number;
    @Input() authors: User[];
    @Input() editors: User[];
    @Input() creativeTypes: any;
    @Input() channels: Channel[];

    @Output() authorChanged = new EventEmitter();
    @Output() editorChanged = new EventEmitter();
    @Output() creativeTypeChanged = new EventEmitter();
    @Output() channelChanged = new EventEmitter();

    get zh() { return zh_CN.cms; }
}
