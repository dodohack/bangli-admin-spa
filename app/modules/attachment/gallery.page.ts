/**
 *
 */
import { Component }      from '@angular/core';
import { OnInit, NgZone } from '@angular/core';
import { EventEmitter }   from '@angular/core';

import { AuthCache } from '../../auth.cache';

@Component({ template: require('./gallery.page.html') })
export class GalleryPage implements OnInit
{
    zone: NgZone;
    options: Object;
    progress: number = 0;
    response: any = {};

    uploadEvents = new EventEmitter();

    ngOnInit() {
        this.zone = new NgZone({ enableLongStackTrace: false });
        this.options = {
            filterExtensions: true,
            allowedExtensions: ['image/png', 'image/jpg'],
            calculateSpeed: true,
            autoUpload: false,
            authToken: AuthCache.token(),
            authTokenPrefix: 'Bearer',
            url: AuthCache.API() + AuthCache.API_PATH().file_upload
        };
    }

    handleUpload(data: any): void {
        console.log("handleUpload, data: ", data);
        this.zone.run(() => {
            this.response = data;
            this.progress = data.progress.percent / 100;
        });
    }

    startUpload() {
        this.uploadEvents.emit('startUpload');
    }
}
