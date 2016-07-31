/**
 * This is the form template used to in fast editing a post in post list
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm }    from '@angular/forms';

import { User, Post } from '../models';
import { POST_STATUS } from '../models';
import { PostCttCloudComponent } from './post-ctt-cloud.component';

let template = require('./fast-edit-post-form.html');
@Component({
    selector: 'fast-edit-post-form',
    template: template,
    directives: [ PostCttCloudComponent ]
})
export class FastEditPostFormComponent {
    postStatus: any;

    /* Post information needs to modify */
    @Input()
    post: Post;
    
    @Input()
    authors: User[];
    
    @Input()
    editors: User[];
    
    @Output()
    toggle = new EventEmitter();

    @Output()
    cancel = new EventEmitter();
    
    constructor() {
        this.postStatus = POST_STATUS;
    }
    
    toggleRightBar(event) {
        this.toggle.emit(event);
    }

    cancelEditing(event) {
        this.cancel.emit(event);
    }
}
