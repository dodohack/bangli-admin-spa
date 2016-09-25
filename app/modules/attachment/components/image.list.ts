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
    template: require('./image.list.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageList extends EntityList
{
    // Current selected image
    image: any;
    // Current selected image index
    index: number = 0;
    
    setImage(i, entity) {
        this.index = i;
        this.image = entity;
    }
    
    get curImageUrl() {
        if (this.image) return this.imgUrl(this.image);
    }
    
    preImage() {
        if (this.index > 0) this.index--;
        this.image = this.getEntityByIndex(this.index);
    }
    
    nextImage() {
        if (this.index < this.ids.length - 1) this.index++;
        this.image = this.getEntityByIndex(this.index);
    }

    getEntityByIndex(i) { return this.entities[this.ids[i]]; }
    
    imgUrl(entity) {
        return this.baseResUrl + '/' + entity.path + '/' + entity.filename;
    }
}
