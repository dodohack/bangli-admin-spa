/**
 *
 */
import { Component }      from '@angular/core';
import { Input, Output }  from '@angular/core';
import { EventEmitter }   from '@angular/core';
import { FileUploader }   from 'ng2-file-upload';

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
    @Input() isOpen: boolean = false;

    cache = CacheSingleton.getInstance();

    uploader: FileUploader;

    hasDropZoneOver: boolean = false;

    constructor() {
        this.uploader = new FileUploader({
            url:  APIS[this.cache.key] + API_PATH.attachments,
            authToken: 'bearer ' + this.cache.token,
        });
    }

    fileOverZone($event) { this.hasDropZoneOver = $event; }
}
