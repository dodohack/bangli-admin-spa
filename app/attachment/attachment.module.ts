/**
 * This module manages images, uploaded files
 */
import { NgModule }     from '@angular/core';
import { SharedModule } from '../directives/shared.module';

import { routing }      from './routing';

import { GalleryPage }  from './gallery.page';

@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [
        GalleryPage
    ]
})
export class AttachmentModule {}
