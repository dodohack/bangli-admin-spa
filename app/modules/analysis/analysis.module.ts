/**
 * This module manages images, uploaded files
 */
import { NgModule }     from '@angular/core';
import { SharedModule } from '../directives/shared.module';

import { routing }           from './routing';
import { AnalysisPage }      from './analysis.page';
import { CmsAnalysisPage }   from './cms.page';
import { ShopAnalysisPage } from './shop.page';
import { BbsAnalysisPage }   from './bbs.page';

@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [
        AnalysisPage,
        CmsAnalysisPage,
        ShopAnalysisPage,
        BbsAnalysisPage
    ]
})
export class AnalysisModule {}
