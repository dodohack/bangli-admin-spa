/**
 *
 */
import { Component }      from '@angular/core';
import { Input, Output }  from '@angular/core';
import { EventEmitter }   from '@angular/core';
import { FileUploader }   from 'ng2-file-upload';
import { ParsedResponseHeaders }   from 'ng2-file-upload';
import { FileItem }       from 'ng2-file-upload';

import { APIS, API_PATH } from '../../api';
import { CacheSingleton } from '../../effects/cache.singleton';
import { EntitiesPage }   from '../base/entities.page';
import { ENTITY }         from '../../models';
import { AppState }       from '../../reducers';
import { zh_CN }          from '../../localization';


@Component({
    selector: 'image-uploader',
    template: require('./image-uploader.html')
})
export class ImageUploader
{
    // Is this uploder accordion expanded
    @Input() isOpen: boolean = false;

    @Output() onCompleteItem = new EventEmitter();
    @Output() showGallery    = new EventEmitter();

    cache = CacheSingleton.getInstance();

    uploader: FileUploader;

    hasDropZoneOver: boolean = false;

    constructor() {
        this.uploader = new FileUploader({
            url:  APIS[this.cache.key] + API_PATH.attachments,
            authToken: 'bearer ' + this.cache.token,
        });

        // Listen on response on item upload complete, emit the image entity
        // info returned
        this.uploader.onCompleteItem =
            (item: FileItem, response: string, status: number,
             headers: ParsedResponseHeaders) => {
                console.log("Item complete, response: ", response);
                this.onCompleteItem.emit(JSON.parse(response));
            }
    }

    fileOverZone($event) { this.hasDropZoneOver = $event; }
}
