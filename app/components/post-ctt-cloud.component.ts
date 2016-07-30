/**
 * Post category, tag, topic cloud, shared by post list and post single page
 */
/**
 * This is the form template used to in fast editing a post in post list
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm }    from '@angular/forms';

import { Post } from '../models';

let template = require('./post-ctt-cloud.html');
@Component({
    selector: 'post-ctt-cloud',
    template: template
})
export class PostCttCloudComponent {
    /* Post information needs to modify */
    @Input()
    post: Post;

    @Output()
    toggle = new EventEmitter();

    toggleRightBar(event) {
        this.toggle.emit(event);
    }
}