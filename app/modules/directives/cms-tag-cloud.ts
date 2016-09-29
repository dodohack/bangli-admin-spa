/**
 * Post category, tag, topic cloud, shared by post list and post single page
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy }                from "@angular/core";

import { Post } from '../../models';

@Component({
    selector: 'cms-tag-cloud',
    template: require('./cms-tag-cloud.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmsTagCloud {
    /* Post information needs to modify */
    @Input()
    post: Post;

    @Output()
    toggle = new EventEmitter();

    @Output()
    deleteCat = new EventEmitter();

    @Output()
    deleteTag= new EventEmitter();

    @Output()
    deleteTopic = new EventEmitter();

    @Output()
    toggleGeoLocation = new EventEmitter();
}