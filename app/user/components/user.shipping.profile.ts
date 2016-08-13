/**
 * Display user shop related profile, such as orders, content of carts,
 * shop_managers can see this
 */
import { Component, Input } from '@angular/core';
import { User } from '../../models';

import { zh_CN } from '../../localization';

let t = require('./user.shipping.profile.html');
@Component({
    selector: 'user-shipping-profile',
    template: t,
})
export class UserShippingProfileTab
{
    @Input()
    uuid: string;

    @Input()
    isMyProfile: boolean;

    @Input()
    isSuperUser: boolean;

    @Input()
    user: User;

    get zh() { return zh_CN.user; }
}