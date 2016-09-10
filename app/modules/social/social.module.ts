/**
 * This is the module contains all the system level settings, manageable only
 * by administrator.
 */
import { NgModule } from '@angular/core';
import { SharedModule } from '../directives/shared.module';

import { routing }         from './routing';
import { SettingPage }     from './setting.page';

@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [
        SettingPage,
    ]
})
export class SocialModule {}
