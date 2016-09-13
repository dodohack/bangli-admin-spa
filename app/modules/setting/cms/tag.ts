/**
 * Cms tag settings
 */
import { Component }               from '@angular/core';
import { Input, Output }           from '@angular/core';
import { EventEmitter }            from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { Tag }               from "../../../models";
import { Channel }           from "../../../models";

@Component({ 
    selector: 'cms-tag-setting',
    template: require('./tag.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmsTag
{
    @Input() tags: Tag[];
    @Input() channel: Channel;

    // Tag selected
    tag: Tag;
    
    // Edit or remove tag actions
    @Output() edit = new EventEmitter();
    @Output() remove = new EventEmitter();

    setTag(tag) {
        this.tag = tag;
    }
}
