/**
 * Cms setting page menu
 */
import { Component, Input }        from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Channel }                 from "../../../models";

import { zh_CN }                   from '../../../localization';

@Component({ 
    selector: 'cms-setting-menu',
    template: require('./menu.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmsSettingMenu
{
    @Input() cmsChannels: Channel[];
    @Input() taxonomy: string;
 
    // We manage these settings here
    //settings = ['category', 'tag', 'channel'];
    settings = ['category'];
    
    get zh() { return zh_CN; }
}
