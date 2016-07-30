/**
 * This is the form template used to in fast editing a post in post list
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm }    from '@angular/forms';

import { Post } from '../models';
import { PostCttCloudComponent } from './post-ctt-cloud.component';

let template = require('./fast-edit-post-form.html');
@Component({
    selector: 'fast-edit-post-form',
    template: template,
    directives: [ PostCttCloudComponent ]
})
export class FastEditPostFormComponent {
    /* Post information needs to modify */
    @Input()
    post: Post;
    
    @Output()
    toggle = new EventEmitter();
    
    toggleRightBar(event) {
        this.toggle.emit(event);
    }
}
