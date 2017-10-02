/**
 * This is the form template used to in fast editing a post in post list
 */
import { Component, EventEmitter }         from '@angular/core';
import { Input, Output, AfterContentInit } from '@angular/core';

import { User, Post } from '../../models';
import { zh_CN } from '../../localization';

@Component({
    selector: 'fast-edit-post-form',
    template: require('./fast-edit-post-form.html')
})
export class FastEditPostFormComponent implements AfterContentInit {

    /* An temporary post holds common part of bulk editing posts */
    tempPost = new Post();

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

    get zh() { return zh_CN.cms; }
    
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
