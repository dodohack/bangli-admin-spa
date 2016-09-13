/**
 * Cms setting page menu
 */
import { Component, Input }        from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Channel }                 from "../../../models";

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
    settings = ['category', 'tag', 'channel'];
}
