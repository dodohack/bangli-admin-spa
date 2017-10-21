/**
 * This is the base class of entity list includes:
 * Post, Topic, Page, Product, Order, Voucher, etc
 */
import { ViewChild }     from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';

import { Entity, ENTITY, ENTITY_INFO } from '../../models';
import { Channel }        from '../../models';
import { CacheSingleton } from "../../effects/cache.singleton";

export class EntityList
{
    cache = CacheSingleton.getInstance();

    // FIXME: ImageList class only, moving this to ImageList class causes
    // build error.
    @ViewChild('modalEdit') modalEdit;

    @Input() frontendUrl: string;
    @Input() paginator: any;
    @Input() entities: Entity[];
    @Input() selectedEntities: Entity[]; // Only used for gallery modal
    @Input() idsCurPage: number[]; // FIXME: entity id or user uuid
    @Input() authorsObj: any;     // Authors object
    @Input() channelsObj: any;    // Channels object

    // The entity type of the list: post, topic, page, attachment etc
    @Input() etype: string;

    // Base resource url(base url to image root)
    @Input() baseResUrl: string;

    // Display a popup image editor or embedded editor at right side
    // FIXME: Put this into ImageList class causes build error
    @Input() embeddedEditor: boolean = false;

    _idsEditing: number[];
    @Input() set idsEditing(value) { this._idsEditing = [...value]; }
    get idsEditing() { return this._idsEditing; }

    // Fast edit single or multiple entities
    @Output() batchEdit = new EventEmitter();
    // Delete multiple entities
    @Output() batchDelete = new EventEmitter();
    // Lock entities for offline edit
    @Output() batchOfflineEdit = new EventEmitter();
    // Lock entities, so no one can edit it except admin.
    @Output() batchLock = new EventEmitter();
    // Load next page image
    @Output() loadMoreImages = new EventEmitter();
    // Set topic logo image
    @Output() setLogoEvent = new EventEmitter();
    // Set feature image of a entity
    @Output() setFeatureImageEvent = new EventEmitter();
    // Add/remove image to/from selected image list
    @Output() insertImageEvent = new EventEmitter();
    // Set ad image
    @Output() setAdImageEvent = new EventEmitter();

    batchAction: string = '';

    get isPost() { return this.etype == ENTITY.POST; }
    get isTopic() { return this.etype == ENTITY.TOPIC; }
    get isOffer() { return this.etype == ENTITY.OFFER; }

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

    isOnlineLocked(entity) {
        return entity.activities && entity.activities.length &&
                entity.activities[0].edit_lock === 1;
    }

    isOfflineLocked(entity) {
        return entity.activities && entity.activities.length &&
            entity.activities[0].edit_lock === 2;
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
    previewLink(entity: Entity) {
        let base = this.frontendUrl + '/';

        switch (this.etype) {
            case ENTITY.TOPIC: {
                if (!this.channelsObj) return;

                return base + ENTITY_INFO[this.etype].slug + '/'
                    + this.channelsObj[entity.channel_id].slug + '/'
                    + entity.guid;
            }

            // Default to cms type
            default:
                return base + 'cms/' + ENTITY_INFO[this.etype].slug + '/' + entity.id;
        }
    }

    // Get absolute image url from either absolute or relative url
    imageUrl(uri: string) {
        if (typeof uri != 'undefined' && uri != null && uri != '') {
            // Test if uri starts with 'http'
            if (uri[0] == 'h' && uri[1] == 't') return uri;
            // Else return image url based on our image server
            return this.cache.img_server + uri;
        } else {
            // Return placeholder image
            return 'http://via.placeholder.com/80x80?text=ads';
        }
    }
}
