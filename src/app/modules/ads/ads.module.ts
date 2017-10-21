import { NgModule }     from '@angular/core';
import { SharedModule } from '../directives/shared.module';
import { AttachmentModule } from '../attachment/attachment.module';

import { routing }      from './routing';
import { AdsList }      from './components/ads.list';
import { AdsPage }      from './ads.page';
import { AdPage }       from './ad.page';

@NgModule({
    imports: [ SharedModule, AttachmentModule, routing ],
    declarations: [
        AdsList,
        AdsPage,
        AdPage
    ]
})
export class AdsModule {}
