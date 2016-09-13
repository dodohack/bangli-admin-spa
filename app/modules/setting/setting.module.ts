/**
 * This is the module contains all the system level settings, manageable only
 * by administrator.
 */
import { NgModule }     from '@angular/core';
import { SharedModule } from '../directives/shared.module';

import { routing }         from './routing';
import { SettingPage }     from './setting.page';
import { LocationsPage }   from './locations.page';
import { CmsPage }         from './cms.page.ts';
import { ShopPage }        from './shop.page.ts';
import { BbsPage }         from './bbs.page.ts';

import { SettingMenu }     from './components/menu';
import { CmsSettingMenu }  from './cms/menu.ts';
import { CmsCategory }     from './cms/category.ts';
import { CmsTag }          from './cms/tag.ts';
import { CmsTopic }        from './cms/topic.ts';
import { CmsChannel }      from './cms/channel.ts';


@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [
        SettingMenu,

        SettingPage,
        LocationsPage,
        CmsPage,
        ShopPage,
        BbsPage,

        CmsSettingMenu,
        CmsCategory,
        CmsTag,
        CmsTopic,
        CmsChannel,
    ]
})
export class SettingModule {}
