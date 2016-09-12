/**
 * Cms setting page menu
 */
import { Component, Input }        from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Channel }                 from "../../../models";

@Component({ 
    selector: 'cms-setting-menu',
    template: require('./setting.menu.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmsSettingMenu
{
    @Input() cmsChannels: Channel[];
    @Input() activeSetting: string;
 
    // We manage these settings here
    settings = ['category', 'tag', 'topic', 'channel'];
}
