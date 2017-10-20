/**
 * Cms setting page menu
 */
import { Component, Input }        from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'setting-menu',
    templateUrl: './menu.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingMenu
{
    // We manage these settings here
    settings = [
        { slug: 'cms',      name: '内容系统' },
        { slug: 'bbs',      name: '论坛系统' },
        { slug: 'location', name: '地理位置' },
        { slug: 'menu',     name: '网站目录' },
        { slug: 'offer',   name: '优惠系统' },
        { slug: 'thumb',    name: '缩略图' },
    ];
}
