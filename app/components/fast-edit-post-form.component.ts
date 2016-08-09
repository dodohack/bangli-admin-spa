/**
 * This is the form template used to in fast editing a post in post list
 */
import { Component, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { NgForm }    from '@angular/forms';

import { User, Post } from '../models';
import { POST_STATUSES } from '../models';
import { PostCttCloudComponent } from './post-ctt-cloud.component';

import { zh_CN } from '../localization';

let template = require('./fast-edit-post-form.html');
@Component({
    selector: 'fast-edit-post-form',
    template: template,
    directives: [ PostCttCloudComponent ]
})
export class FastEditPostFormComponent implements AfterContentInit {

    /* An temporary post holds common part of bulk editing posts */
    tempPost = new Post(-1, -1, -1, -1, '', '', '', []);

    /* Post information needs to modify, optional */
    @Input()
    post: Post;

    /* List of posts, optional */
    @Input()
    posts: Post[];
    
    @Input()
    authors: User[];
    
    @Input()
    editors: User[];
    
    @Output()
    toggle = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    constructor() {}
    
    get POST_STATUSES() { return POST_STATUSES; }

    get zh() { return zh_CN.post; }
    
    ngAfterContentInit() {
        if (this.posts) {
            this.initTempPost();
        }
    }
    
    toggleRightBar(event) { this.toggle.emit(event); }

    cancelEditing(event) { this.cancel.emit(event); }

    /* FIXME: Parent component automatically get a (submit) event, is that
     * because we click the 'submit' button of the form? */
    onSubmit(event) {}


    private initTempPost() {
        // Abstract common part from this.posts into this.tempPost
        //this.tempPost = Post.abstractCommonPartFromPosts(this.posts);
    }
}
