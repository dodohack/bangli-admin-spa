/**
 * Display a table list of posts/topics/pages
 */
import { Component, Inject } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { EntityList }    from '../../base/entity.list';

import { zh_CN } from '../../../localization';
import {Entity} from "../../../models/entity";
import {Helper} from "../../../helper";

@Component({
    selector: 'image-list',
    templateUrl: './image.list.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageList extends EntityList
{
    // Current selected image
    image: any;
    // Current selected image index
    index: number = -1;

    // Current selected images
    //images: any;
    // Current selected image index
    indexes: number[] = [];

    public constructor(public helper: Helper) {
        super(helper);
    }

    get curImageUrl() {
        return this.helper.imageUrl(this.image);
    }
    
    preImage() {
        if (this.index > 0) this.index--;
        this.image = this.getEntityByIndex(this.index);
    }
    
    nextImage() {
        if (this.index < this.idsCurPage.length - 1) this.index++;
        this.image = this.getEntityByIndex(this.index);
    }

    getEntityByIndex(i) { return this.entities[i]; }

    editImage(i, entity) {
        this.index = i;
        this.image = entity;
        if (!this.embeddedEditor)
            this.modalEdit.show();
        else {
            if (this.indexes.indexOf(i) !== -1) // Remove the image from the list
                this.indexes = this.indexes.filter(idx => idx != i);
            else
                this.indexes = [...this.indexes, i];
        }
    }

    // If the image is selected or not
    isSelected(i) {
        return this.indexes.indexOf(i) !== -1;
    }

    // Cancel selection
    cancelImage() { this.indexes = [];  }

    // Set topic logo
    setLogoImage() {
        if (this.indexes.length == 1) {
            let img = this.entities[this.indexes[0]];
            let uri = img.path + img.filename;
            this.setLogoEvent.emit(uri);
            this.cancelImage();
        }
    }

    // Set advertise image
    setAdImageImage() {
        if (this.indexes.length == 1) {
            let img = this.entities[this.indexes[0]];
            let uri = img.path + img.filename;
            this.setAdImageEvent.emit(uri);
            this.cancelImage();
        }
    }

    // Set feature image[s]
    setFeatureImage() {
        for (let i = 0; i < this.indexes.length; i++)
            this.setFeatureImageEvent.emit(this.entities[this.indexes[i]]);
        this.cancelImage();
    }

    // Add image to the content of current editing entity, this is done by
    // insert 'html' of image tags to the head of the content.
    insertImages() {
        this.indexes.sort((a, b) => {return  a - b});

        let ret = '';
        for (let i = 0; i < this.indexes.length; i++) {
            ret += '<img src="' + this.helper.imageUrl(this.entities[i]) + '">\n';
        }

        this.insertImageEvent.emit(ret);
        this.cancelImage();
    }
}


@Component({
    selector: 'image-list-dialog',
    template: `
    <h2 mat-dialog-title>媒体库</h2>

    <mat-dialog-content>
      <image-list [etype]="data.etype"
      [entities]="data.entities"
      [selectedEntities]="data.selectedEntities"
      [idsCurPage]="data.idsCurPage"
      [embeddedEditor]="data.embeddedEditor"
      (loadMoreImages)="loadMoreImages.emit($event)"
      (setFeatureImageEvent)="setFeatureImageEvent.emit($event)"
      (insertImageEvent)="insertImageEvent.emit($event)"></image-list>
    </mat-dialog-content>

    <mat-dialog-actions>
      <button mat-raised-button color="primary" mat-dialog-close>关闭</button>
    </mat-dialog-actions>
  `
})
export class ImageListDialog {
    //@Input() etype: string;
    //@Input() baseRelUrl: string;
    //@Input() entities: Entity[];
    //@Input() selectedEntities: Entity[];
    //@Input() idsCurPage: string[];
    //@Input() embeddedEditor: boolean;
    @Output() loadMoreImages = new EventEmitter();
    @Output() setFeatureImageEvent = new EventEmitter();
    @Output() insertImageEvent = new EventEmitter();

    constructor(public dialogRef: MatDialogRef<ImageListDialog>,
                @Inject(MAT_DIALOG_DATA) public data: any) {}
}

