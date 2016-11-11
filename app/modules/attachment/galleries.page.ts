/**
 *
 */
import { Component }      from '@angular/core';
import { OnInit, NgZone } from '@angular/core';
import { EventEmitter }   from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router }         from '@angular/router';
import { Store }          from '@ngrx/store';
import { FileUploader }   from 'ng2-file-upload';

import { APIS, API_PATH, IMG_SERVER }  from '../../api';
import { CacheSingleton }    from '../../effects/cache.singleton';
import { EntitiesPage }      from '../base/entities.page';
import { ENTITY }            from '../../models';
import { AppState }          from '../../reducers';
import { zh_CN }             from '../../localization';


@Component({ template: require('./galleries.page.html') })
export class GalleriesPage extends EntitiesPage
{
    cache = CacheSingleton.getInstance();

    uploader: FileUploader;

    hasDropZoneOver: boolean = false;

    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router) {
        super(ENTITY.ATTACHMENT, route, store, router, true/* pageless */);

        this.uploader = new FileUploader({
            url:  APIS[this.cache.key] + API_PATH.attachments,
            authToken: 'bearer ' + this.cache.token,
        });
    }

    get imgBaseUrl() { return IMG_SERVER[this.cache.key]; }

    fileOverZone($event) { this.hasDropZoneOver = $event; }
}
