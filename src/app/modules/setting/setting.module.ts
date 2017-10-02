/**
 * This is the module contains all the system level settings, manageable only
 * by administrator.
 */
import { NgModule }     from '@angular/core';
import { SharedModule } from '../directives/shared.module';

import { routing }         from './routing';
import { SettingPage }     from './setting.page';
import { LocationsPage }   from './locations.page';
import { CmsPage }         from './cms.page';
import { ShopPage }        from './shop.page';
import { BbsPage }         from './bbs.page';
import { FeMenuPage }      from './femenu.page';
import { ThumbPage }       from './thumb.page';

import { SettingMenu }     from './components/menu';
import { CmsSettingMenu }  from './cms/menu';
import { CmsCategory }     from './cms/category';
import { CmsTag }          from './cms/tag';
import { CmsTopicType }    from './cms/topic-type';
import { CmsChannel }      from './cms/channel';
import { FeMenuSetting }   from './components/fe-menu-setting';
import { ModalEditMenu }   from './components/modal-edit-menu';

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
        ThumbPage,

        CmsSettingMenu,
        CmsCategory,
        CmsTag,
        CmsTopicType,
        CmsChannel,
        FeMenuSetting,
        ModalEditMenu,
    ]
})
export class SettingModule {}
