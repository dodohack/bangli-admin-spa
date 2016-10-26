/**
 * Cms setting page menu
 */
import { Component, Input }        from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'setting-menu',
    template: require('./menu.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingMenu
{
    // We manage these settings here
    settings = [
        { slug: 'cms',      name: '内容系统' },
        { slug: 'shop',     name: '商店系统' },
        { slug: 'bbs',      name: '论坛系统' },
        { slug: 'location', name: '地理位置' },
        { slug: 'menu',     name: '网站目录' },
    ];
}
