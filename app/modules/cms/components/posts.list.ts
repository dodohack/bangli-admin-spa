/**
 * Display a table list of posts
 */
import { Component }     from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { PostsState } from '../../../reducers/posts';

@Component({
    selector: 'posts-list',
    template: require('./posts.list.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsList
{
    _postsState: PostsState;
    @Input() set postsState(value) { this._postsState = Object.assign({}, value); }
    get postsState() { return this._postsState; }

    get ids() { return this._postsState.ids; }
    get posts() { return this._postsState.entities; }
    get paginator() { return this._postsState.paginator; }
}
