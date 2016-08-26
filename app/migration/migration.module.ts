import { NgModule }     from '@angular/core';
import { SharedModule } from '../directives/shared.module';

import { routing }      from './routing';
import { MigrationPage } from './migration';

@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [
        MigrationPage
    ]
})
export class MigrationModule {}
