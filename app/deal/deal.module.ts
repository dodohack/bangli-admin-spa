/**
 * Bangli domain only module, all sort of promotions
 */
import { NgModule }     from '@angular/core';
import { SharedModule } from '../directives/shared.module';

import { routing }      from './routing';

import { DealsPage }    from './deals.page';

@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [
        DealsPage
    ]
})
export class DealModule {}
