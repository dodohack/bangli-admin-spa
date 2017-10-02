/**
 * This is the module contains all the system level settings, manageable only
 * by administrator.
 */
import { NgModule }     from '@angular/core';
import { SharedModule } from '../directives/shared.module';

import { routing }        from './routing';
import { CsPage }         from './cs.page';

@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [
        CsPage,
    ]
})
export class CsModule {}
