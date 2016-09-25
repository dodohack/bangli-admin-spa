/**
 * This is the base class of entity list includes:
 * Post, Topic, Page, Product, Order, Voucher, etc
 */
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';

import { User }                from "../../models";
import { ENTITY, ENTITY_INFO } from '../../models';
import { AuthState }      from '../../reducers/auth';
import { CmsAttrsState }  from "../../reducers/cmsattrs";
import { ShopAttrsState } from "../../reducers/shopattrs";

export class EntityList
{
    @Input() authState: AuthState;
    @Input() cmsState: CmsAttrsState;

    // The entity type of the list: post, topic, page, product etc
    @Input() etype: string;

    // listState is one of entity type content state
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

    get ids() { return this._listState.ids; }
    get entities() { return this._listState.entities; }
    get paginator() { return this._listState.paginator; }
    get authors() {
        // Convert authors array to authors object indexed by author id
        return this.cmsState.authors
            .reduce((users: {[id: number]: User}, entity: User) => {
                return Object.assign(users, { [entity.id]: entity });
            }, {});
    }
    get editors() {
        // Convert editors array to editors object indexed by editor id
        return this.cmsState.editors
            .reduce((users: {[id: number]: User}, entity: User) => {
                return Object.assign(users, { [entity.id]: entity });
            }, {});
    }
    get channels() { return this.cmsState.channels; }

    // If batch options can be enabled
    get canEdit() {
        return this._listState.editing && this._listState.editing.length;
    }

    // If all post is selected, we use '<=' in case we have extra editing
    // post which is not in the list(newly created one?).
    get isAllSelected() {
        return this._listState.ids.length <= this._listState.editing.length;
    }

    // If the entity has an author
    hasAuthor(id) {
        if (this.etype === ENTITY.CMS_POST && id && this.authors[id])
            return true;
        return false;
    }
    // Get author name of given entity
    authorName(id) { return this.authors[id].name; }

    // If the entity has an editor
    hasEditor(id) { return this.editors[id]; }
    // Get editor name of given entity
    editorName(id) { return this.editors[id].name; }

    // If the the entity is in editing
    isEditing(id) {
        return this._listState.editing.filter(eid => eid === id).length;
    }

    hasActivity(id): boolean {
        return this._listState.entities[id].activities &&
            this._listState.entities[id].activities.length > 0;
    }

    getActivity(id) {
        return this._listState.entities[id].activities[0];
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
    editLink(id: number) { return '/' + ENTITY_INFO[this.etype].slug + '/' + id; }

    // Frontend preview link
    previewLink(id: number) {
        let base = this.authState.domains[this.authState.key].url + '/';

        switch (this.etype) {
            case ENTITY.CMS_TOPIC:
                return base + ENTITY_INFO[this.etype] + '/'
                    + this.cmsState.channels[this._listState.entities[id].channel_id] + '/'
                    + this._listState.entities[id].guid;

            case ENTITY.SHOP_PRODUCT:
                return base + ENTITY_INFO[this.etype] + '/' + this._listState.entities[id].guid;

            // Default to cms type
            default:
                return base + 'cms/' + ENTITY_INFO[this.etype] + '/' + id;
        }
    }
}
