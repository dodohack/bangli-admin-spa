/**
 * Display a table list of posts/topics/pages
 */
import { Component }     from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { AuthState }     from '../../../reducers/auth';
import { PostsState }    from '../../../reducers/posts';
import { TopicsState }   from '../../../reducers/topics';
import { PagesState }    from '../../../reducers/pages';
import { CmsAttrsState } from "../../../reducers/cmsattrs";

import { zh_CN } from '../../../localization';

@Component({
    selector: 'cms-list',
    template: require('./cms.list.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmsList
{
    @Input() authState: AuthState;
    @Input() cmsState: CmsAttrsState;

    // The entity type of the list: post, topic or page
    @Input() isPost:  boolean;
    @Input() isTopic: boolean;
    @Input() isPage:  boolean;

    // listState is one of 3 major cms content state
    _listState: any;
    @Input() set listState(value) { this._listState = Object.assign({}, value); }
    get listState() { return this._listState; }

    // Fast edit single or multiple entities
    @Output() batchEdit = new EventEmitter();
    // Delete multiple entities
    @Output() batchDelete = new EventEmitter();
    // Lock entities for offline edit
    @Output() batchOfflineEdit = new EventEmitter();
    // Lock entities, so no one can edit it except admin.
    @Output() batchLock = new EventEmitter();

    batchAction: string = '';
    
    get zh() { return zh_CN.cms; }
    get ids() { return this._listState.ids; }
    get entities() { return this._listState.entities; }
    get paginator() { return this._listState.paginator; }
    get authors() { return this.cmsState.authors; }
    get editors() { return this.cmsState.editors; }

    // If batch options can be enabled
    get canEdit() {
        return this._listState.editing && this._listState.editing.length;
    }
    
    // If all post is selected, we use '<=' in case we have extra editing
    // post which is not in the list(newly created one?).
    get isAllSelected() {
        return this._listState.ids.length <= this._listState.editing.length;
    }

    // Is given entity has a author
    hasAuthor(id) {
        return this.authors[this.entities[id].author_id];
    }
    // Get author name of given entity
    authorName(id) {
        return this.authors[this.entities[id].author_id].name;
    }
    // Get editor name of given entity
    editorName(id) {
        return this.editors[this.entities[id].editor_id].name;
    }
    // If the the entity is in editing
    isEditing(id) {
        return this._listState.editing.filter(eid => eid === id).length;
    }
    
    hasActivity(id): boolean {
        return this.entities[id].activities &&
            this.entities[id].activities.length > 0;
    }
    
    getActivity(id) {
        return this.entities[id].activities[0];
    }

    // Add id to editing list if it is not added, or
    // Remove id from editing list if it is already exists
    updateEditList(id) {
        let idx = this._listState.editing.indexOf(id);
        if (idx === -1)
            this._listState.editing.push(id);
        else
            this._listState.editing.splice(idx, 1);
    }

    // Select all or deselect all
    updateAll() {
        if (this.isAllSelected)
            this._listState.editing = [];
        else
            this._listState.editing = [...this._listState.ids];
    }

    // Select batch actions
    submitBatchAction() {
        switch(this.batchAction) {
            case 'edit':
                this.batchEdit.emit(this._listState.editing);
                break;
            case 'delete':
                this.batchDelete.emit(this._listState.editing);
                break;
            case 'offline_edit':
                this.batchOfflineEdit.emit(this._listState.editing);
                break;
            case 'lock':
                this.batchLock.emit(this._listState.editing);
                break;
            default:
                break;
        }
    }
    
    // Entity editing link
    editLink(id: number) {
        if (this.isPost)
            return '/post/' + id;
        else if (this.isTopic)
            return '/topic/' + this.entities[id].guid;
        else if (this.isPage)
            return '/page/' + id;
    }

    // Frontend preview link
    previewLink(id: number) {
        let base = this.authState.domains[this.authState.key].url;

        if (this.isPost)
            return base + '/' + id + '.html';

        if (this.isTopic)
            return base + '/TODO_TOPIC';

        if (this.isPage)
            return base + '/TODO_PAGE';
    }
}
