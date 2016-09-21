/**
 * This is the module contains all the system level settings, manageable only
 * by administrator.
 */
import { NgModule } from '@angular/core';
import { SharedModule } from '../directives/shared.module';

import { routing }         from './routing';

import { SocialMenu }      from './components/menu';
import { SocialPage }      from './social.page';
import { CommentsPage }    from './comments.page';
import { SettingPage }     from './setting.page';

@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [
        SocialMenu,

        SocialPage,
        CommentsPage,
        SettingPage,
    ]
})
export class SocialModule {}
