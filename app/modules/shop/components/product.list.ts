/**
 * Tables of list products
 */
import { Component }     from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { AuthState }      from '../../../reducers/auth';
import { ProductsState }  from '../../../reducers/products';
import { ShopAttrsState } from "../../../reducers/shopattrs";
import { CmsAttrsState } from "../../../reducers/cmsattrs";

import { zh_CN } from '../../../localization';

@Component({
    selector: 'product-list',
    template: require('./product.list.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductList
{
    @Input() authState: AuthState;
    @Input() shopState: ShopAttrsState;
    @Input() cmsState:  CmsAttrsState;

    _productsState: ProductsState;
    @Input() set productsState(value) { this._productsState = Object.assign({}, value); }
    get productsState() { return this._productsState; }

    // Fast edit single or multiple entities
    @Output() batchEdit = new EventEmitter();
    // Delete multiple entities
    @Output() batchDelete = new EventEmitter();
    // Lock entities for offline edit
    @Output() batchOfflineEdit = new EventEmitter();
    // Lock entities, so no one can edit it except admin.
    @Output() batchLock = new EventEmitter();

    batchAction: string = '';

    get zh() { return zh_CN.product; }
    get ids() { return this._productsState.ids; }
    get products() { return this._productsState.entities; }
    get paginator() { return this._productsState.paginator; }
    get editors() { return this.cmsState.editors; }


    // If batch options can be enabled
    get canEdit() {
        return this._productsState.editing && this._productsState.editing.length;
    }

    // If all post is selected, we use '<=' in case we have extra editing
    // post which is not in the list(newly created one?).
    get isAllSelected() {
        return this._productsState.ids.length <= this._productsState.editing.length;
    }

    // If the the entity is in editing
    isEditing(id) {
        return this._productsState.editing.filter(eid => eid === id).length;
    }

    hasActivity(id): boolean {
        return this.products[id].activities &&
            this.products[id].activities.length > 0;
    }

    getActivity(id) {
        return this.products[id].activities[0];
    }

    // Add id to editing list if it is not added, or
    // Remove id from editing list if it is already exists
    updateEditList(id) {
        let idx = this._productsState.editing.indexOf(id);
        if (idx === -1)
            this._productsState.editing.push(id);
        else
            this._productsState.editing.splice(idx, 1);
    }

    // Select all or deselect all
    updateAll() {
        if (this.isAllSelected)
            this._productsState.editing = [];
        else
            this._productsState.editing = [...this._productsState.ids];
    }


    // Select batch actions
    submitBatchAction() {
        switch(this.batchAction) {
            case 'edit':
                this.batchEdit.emit(this._productsState.editing);
                break;
            case 'delete':
                this.batchDelete.emit(this._productsState.editing);
                break;
            case 'offline_edit':
                this.batchOfflineEdit.emit(this._productsState.editing);
                break;
            case 'lock':
                this.batchLock.emit(this._productsState.editing);
                break;
            default:
                break;
        }
    }
    
    // Frontend preview link
    previewLink(id: number) {
        return this.authState.domains[this.authState.key].url 
            + '/product/' + this.products[id].guid;
    }
}
