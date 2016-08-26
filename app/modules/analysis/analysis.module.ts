/**
 * This module manages images, uploaded files
 */
import { NgModule }     from '@angular/core';
import { SharedModule } from '../directives/shared.module';

import { routing }      from './routing';

import { HomePage }     from './home.page';

@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [
        HomePage
    ]
})
export class AnalysisModule {}
