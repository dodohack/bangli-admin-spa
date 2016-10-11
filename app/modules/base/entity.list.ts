/**
 * This is the base class of entity list includes:
 * Post, Topic, Page, Product, Order, Voucher, etc
 */
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';

import { User }          from "../../models";
import { Entity, ENTITY, ENTITY_INFO } from '../../models';
import { Channel }        from '../../models';
import { AuthState }      from '../../reducers/auth';
import { CmsAttrsState }  from "../../reducers/cmsattrs";
import { ShopAttrsState } from "../../reducers/shopattrs";
import { EntitiesState }  from "../../reducers/entities";

export class EntityList
{
    @Input() frontendUrl: string;
    @Input() paginator: any;
    @Input() entities: Entity[];
    @Input() idsCurPage: number[];
    @Input() idsEditing: number[];
    @Input() authorsObj: any;  // authors object
    @Input() channels: Channel[];

    // The entity type of the list: post, topic, page, product etc
    @Input() etype: string;
    
    // Base resource url(base url to image root)
    @Input() baseResUrl: string;

    // Fast edit single or multiple entities
    @Output() batchEdit = new EventEmitter();
    // Delete multiple entities
    @Output() batchDelete = new EventEmitter();
    // Lock entities for offline edit
    @Output() batchOfflineEdit = new EventEmitter();
    // Lock entities, so no one can edit it except admin.
    @Output() batchLock = new EventEmitter();

    batchAction: string = '';
    
    get hasEntity() {
        return this.idsCurPage && this.idsCurPage.length > 0;
    }
    
    // If batch options can be enabled
    get canEdit() {
        return this.idsEditing && this.idsEditing.length !== 0;
    }

    /**
     * NOTE: For authors/editors that were left, we don't have their info
     * in authorsObj.
     */
    authorName(id: number) {
        if (this.authorsObj[id]) return this.authorsObj[id].name;
        return 'ID ' + id;
    }

    // If all post is selected, we use '<=' in case we have extra editing
    // post which is not in the list(newly created one?).
    get isAllSelected() {
        if (this.idsEditing)
            return this.idsCurPage.length === this.idsEditing.length;
        return false;
    }

    // If the the entity is in editing
    isEditing(id) {
        return this.idsEditing && this.idsEditing.indexOf(id) !== -1;
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
        let idx = this.idsEditing.indexOf(id);
        if (idx === -1)
            this.idsEditing.push(id);
        else
            this.idsEditing.splice(idx, 1);
    }

    // Select all or deselect all
    updateAll() {
        if (this.isAllSelected)
            this.idsEditing = [];
        else
            this.idsEditing = [...this.idsCurPage];
    }

    // Select batch actions
    submitBatchAction() {
        switch(this.batchAction) {
            case 'edit':
                this.batchEdit.emit(this.idsEditing);
                break;
            case 'delete':
                this.batchDelete.emit(this.idsEditing);
                break;
            case 'offline_edit':
                this.batchOfflineEdit.emit(this.idsEditing);
                break;
            case 'lock':
                this.batchLock.emit(this.idsEditing);
                break;
            default:
                break;
        }
    }

    // Entity editing link
    editLink(id: number) { return '/' + ENTITY_INFO[this.etype].slug + '/' + id; }

    // Frontend preview link
    previewLink(id: number) {
        let base = this.frontendUrl + '/';

        switch (this.etype) {
            case ENTITY.CMS_TOPIC:
                return base + ENTITY_INFO[this.etype].slug + '/'
                    + this.channels[this.entities[id].channel_id] + '/'
                    + this.entities[id].guid;

            case ENTITY.SHOP_PRODUCT:
                return base + ENTITY_INFO[this.etype].slug
                    + '/' + this.entities[id].guid;

            // Default to cms type
            default:
                return base + 'cms/' + ENTITY_INFO[this.etype].slug + '/' + id;
        }
    }
}
