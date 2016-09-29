import { NgModule }     from '@angular/core';
import { SharedModule } from '../directives/shared.module';

import { routing }      from './routing';
import { AdsList }      from './components/ads.list';
import { AdsPage }      from './ads.page';

@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [
        AdsList,
        AdsPage
    ]
})
export class AdsModule {}
