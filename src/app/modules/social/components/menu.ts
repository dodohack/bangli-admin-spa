/**
 * Cms setting page menu
 */
import { Component, Input }        from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'social-menu',
    template: require('./menu.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialMenu
{
    // We manage these settings here
    menus = [
        { slug: 'comment',  name: '评论' },
        { slug: 'share',    name: '分享' },
        { slug: 'setting',  name: '设置' },
    ];
}
