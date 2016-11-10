/**
 * This module manages images, uploaded files
 */
import { NgModule }         from '@angular/core';
import { SharedModule }     from '../directives/shared.module';
import { FileUploadModule } from 'ng2-file-upload';

import { routing }      from './routing';

import { ImageList }      from './components/image.list';
import { GalleriesPage }  from './galleries.page';

@NgModule({
    imports: [ SharedModule, FileUploadModule, routing ],
    declarations: [
        ImageList,
        GalleriesPage
    ]
})
export class AttachmentModule {}
