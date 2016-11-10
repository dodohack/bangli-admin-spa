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

import { IMG_SERVER }        from '../../api';
import { EntitiesPage }      from '../base/entities.page';
import { ENTITY }            from '../../models';
import { AppState }          from '../../reducers';
import { zh_CN }             from '../../localization';


@Component({ template: require('./galleries.page.html') })
export class GalleriesPage extends EntitiesPage
{
    uploader: FileUploader = new FileUploader({url: 'http://localhost:5001'});

    hasDropZoneOver: boolean = false;

    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router) {
        super(ENTITY.ATTACHMENT, route, store, router, true/* pageless */);
    }

    /**
     * FIXME: Wrap sessionStorage here.
     */
    get imgBaseUrl() { return IMG_SERVER[sessionStorage.getItem('key')]; }

    fileOverZone($event) {
        this.hasDropZoneOver = $event;
    }
}
