/**
 * Display a table list of posts/topics/pages
 */
import { Component }     from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { EntityList }    from '../../base/entity.list';

import { zh_CN } from '../../../localization';

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

    get curImageUrl() {
        if (this.image) return this.imgUrl(this.image);
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

    imgUrl(entity) {
        return this.baseResUrl + entity.path + entity.filename;
    }

    thumbUrl(entity) {
        if (entity.thumbnail) {
            let thumb = JSON.parse(entity.thumbnail)['thumb-avatar'];
            if (thumb)
                return this.baseResUrl + entity.thumb_path + thumb.file;
        } else {
            // TODO: Replace with a placeholder image on our server.
            return 'http://via.placeholder.com/80x80?text=thumbnail';
        }
    }

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
        if (this.indexes.indexOf(i) !== -1) return true;
        return false;
    }

    // Cancel selection
    cancelImage() { this.indexes = [];  }

    // Set feature image[s]
    setFeatureImage() {
        for (let i = 0; i < this.indexes.length; i++)
            this.setFeatureImageEvent.emit(this.entities[i]);
    }

    // Add image to the content of current editing entity, this is done by
    // insert 'html' of image tags to the head of the content.
    insertImages() {
        this.indexes.sort((a, b) => {return  a - b});

        let ret = '';
        for (let i = 0; i < this.indexes.length; i++) {
            ret += '<img src="' + this.imgUrl(this.entities[i]) + '">\n';
        }

        this.insertImageEvent.emit(ret);
    }
}
