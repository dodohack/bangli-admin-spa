/**
 * Display a table list of posts
 */
import { Component }     from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { AuthState }     from '../../../reducers/auth';
import { PostsState    } from '../../../reducers/posts';
import { CmsAttrsState } from "../../../reducers/cmsattrs";

import { zh_CN } from '../../../localization';

@Component({
    selector: 'posts-list',
    template: require('./posts.list.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsList
{
    @Input() authState: AuthState;
    @Input() cmsState: CmsAttrsState;
    
    _postsState: PostsState;
    @Input() set postsState(value) { this._postsState = Object.assign({}, value); }
    get postsState() { return this._postsState; }

    get zh() { return zh_CN.post; }
    get ids() { return this._postsState.ids; }
    get posts() { return this._postsState.entities; }
    get paginator() { return this._postsState.paginator; }
    get authors() { return this.cmsState.authors; }
    get editors() { return this.cmsState.editors; }
    
    previewLink(id: number) {
        return this.authState.domains[this.authState.key].url + '/' + id + '.html';
    }
}
