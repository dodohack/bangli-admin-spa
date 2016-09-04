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

    // Fast edit single or multiple posts in posts page
    @Output() batchEdit = new EventEmitter();
    // Delete multiple posts
    @Output() batchDelete = new EventEmitter();
    // Lock posts for offline edit
    @Output() batchOfflineEdit = new EventEmitter();
    // Lock posts, so no one can edit it except admin.
    @Output() batchLock = new EventEmitter();

    batchAction: string = '';
    
    get zh() { return zh_CN.post; }
    get ids() { return this._postsState.ids; }
    get posts() { return this._postsState.entities; }
    get paginator() { return this._postsState.paginator; }
    get authors() { return this.cmsState.authors; }
    get editors() { return this.cmsState.editors; }

    // If batch options can be enabled
    get canEdit() {
        return this._postsState.editing && this._postsState.editing.length;
    }
    
    // If all post is selected, we use '<=' in case we have extra editing
    // post which is not in the list(newly created one?).
    get isAllSelected() {
        return this._postsState.ids.length <= this._postsState.editing.length;
    }
    
    isEditing(id) {
        return this._postsState.editing.filter(eid => eid === id).length;
    }
    
    hasActivity(id): boolean {
        return this.posts[id].activities && this.posts[id].activities.length > 0;
    }
    
    getActivity(id) {
        return this.posts[id].activities[0];
    }

    // Add id to editing list if it is not added, or
    // Remove id from editing list if it is already exists
    updateEditList(id) {
        let idx = this._postsState.editing.indexOf(id);
        if (idx === -1)
            this._postsState.editing.push(id);
        else
            this._postsState.editing.splice(idx, 1);
    }

    // Select all or deselect all
    updateAll() {
        if (this.isAllSelected)
            this._postsState.editing = [];
        else
            this._postsState.editing = [...this._postsState.ids];
    }

    // Select batch actions
    submitBatchAction() {
        switch(this.batchAction) {
            case 'edit':
                this.batchEdit.emit(this._postsState.editing);
                break;
            case 'delete':
                this.batchDelete.emit(this._postsState.editing);
                break;
            case 'offline_edit':
                this.batchOfflineEdit.emit(this._postsState.editing);
                break;
            case 'lock':
                this.batchLock.emit(this._postsState.editing);
                break;
            default:
                break;
        }
    }

    // Post frontend preview link
    previewLink(id: number) {
        return this.authState.domains[this.authState.key].url + '/' + id + '.html';
    }
}
