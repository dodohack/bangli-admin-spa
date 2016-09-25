/**
 *
 */
import { Component }      from '@angular/core';
import { OnInit, NgZone } from '@angular/core';
import { EventEmitter }   from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';

import { EntitiesPage }      from '../base/entities.page';
import { AuthCache }         from '../../auth.cache';
import { ENTITY }            from '../../models';
import { AppState }          from '../../reducers';
import { Ping }              from '../../ping';
import { zh_CN }             from '../../localization';

@Component({ template: require('./galleries.page.html') })
export class GalleriesPage extends EntitiesPage
{
    zone: NgZone;
    options: Object;
    progress: number = 0;
    response: any = {};

    uploadEvents = new EventEmitter();

    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected ping: Ping) {
        super(ENTITY.ATTACHMENT, route, store, ping, true/* pageless */);

        /*
        this.zone = new NgZone({ enableLongStackTrace: false });
        this.options = {
            filterExtensions: true,
            allowedExtensions: ['image/png', 'image/jpg'],
            calculateSpeed: true,
            autoUpload: false,
            authToken: AuthCache.token(),
            authTokenPrefix: 'Bearer',
            url: AuthCache.API() + API_PATH.file_upload
        };
        */
    }
    
    get imgBaseUrl() { return AuthCache.IMG_SERVER(); }

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
