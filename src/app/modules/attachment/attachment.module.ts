/**
 * This module manages images, uploaded files
 */
import { NgModule }         from '@angular/core';
import { SharedModule }     from '../directives/shared.module';

import { routing }      from './routing';

import { ImageList,ImageListDialog } from './components/image.list';
import { GalleriesPage }  from './galleries.page';

@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [
        ImageList,
        ImageListDialog,
        GalleriesPage
    ],
    exports: [
        ImageList,
        ImageListDialog,
        GalleriesPage
    ]
})
export class AttachmentModule {}
