/**
 * This is the form template used to in fast editing a post in post list
 */
import { Component, Input } from '@angular/core';
import { NgForm }    from '@angular/forms';

import { Post } from '../models';

let template = require('./fast-edit-post-form.html');
@Component({
    selector: 'fast-edit-post-form',
    template: template
})
export class FastEditPostFormComponent {
    /* Post information needs to modify */
    @Input()
    post: Post;
}