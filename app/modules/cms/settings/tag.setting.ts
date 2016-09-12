/**
 * Cms tag settings
 */
import { Component }         from '@angular/core';
import { Input, Output }     from '@angular/core';
import { EventEmitter }      from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { Tag }               from "../../../models";
import { Channel }           from "../../../models";

@Component({ 
    selector: 'tag-setting',
    template: require('./tag.setting.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagSetting
{
    @Input() tags: Tag[];
    @Input() channel: Channel;
    
    // Edit or remove tag actions
    @Output() edit = new EventEmitter();
    @Output() remove = new EventEmitter();
}
