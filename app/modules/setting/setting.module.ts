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
import { FeMenuPage }      from './femenu.page.ts';

import { SettingMenu }     from './components/menu';
import { CmsSettingMenu }  from './cms/menu.ts';
import { CmsCategory }     from './cms/category.ts';
import { CmsTag }          from './cms/tag.ts';
import { CmsTopicType }    from './cms/topic-type.ts';
import { CmsChannel }      from './cms/channel.ts';
import { FeMenuSetting }   from './components/fe-menu-setting';

@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [
        SettingMenu,

        SettingPage,
        LocationsPage,
        CmsPage,
        ShopPage,
        BbsPage,
        FeMenuPage,

        CmsSettingMenu,
        CmsCategory,
        CmsTag,
        CmsTopicType,
        CmsChannel,
        FeMenuSetting,
    ]
})
export class SettingModule {}
