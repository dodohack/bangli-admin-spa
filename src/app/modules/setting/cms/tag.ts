/**
 * Cms tag settings
 */
import { Component }               from '@angular/core';
import { Input, Output }           from '@angular/core';
import { OnChanges }               from '@angular/core';
import { EventEmitter }            from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef }       from '@angular/core';

import { Tag }               from "../../../models";
import { Channel }           from "../../../models";

@Component({ 
    selector: 'cms-tag-setting',
    templateUrl: './tag.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmsTag implements OnChanges
{
    // FIXME: OnPush change detection only triggers when the input object is changed, not it's element
    @Input() tags: Tag[];
    @Input() channel: Channel;

    // Tag selected
    tag: Tag;
    
    // Edit or remove tag actions
    @Output() edit = new EventEmitter();
    @Output() add  = new EventEmitter();
    @Output() remove = new EventEmitter();

    constructor(private cd: ChangeDetectorRef) {}

    setTag(tag) {
        this.tag = tag;
    }

    ngOnChanges(changes: any):void {
        console.error("FIXME: OnPush change detection only triggers when the input object is changed, not it's element");
        console.error("WE can mark this as dirty to refresh the page", changes);
        this.cd.markForCheck();
    }
}
