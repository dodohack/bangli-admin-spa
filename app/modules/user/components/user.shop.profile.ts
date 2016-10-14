/**
 * Display basic user shop profile, shop_managers can see this
 */
import { Component, Input } from '@angular/core';

import { User } from '../../../models';

@Component({
    selector: 'user-shop-profile',
    template: require('./user.shop.profile.html')
})
export class UserShopProfileTab
{
    @Input() isMyProfile: boolean;
    @Input() isSuperUser: boolean;
    @Input() user: User;

    get hasShopProfile() {
        return this.user && this.user.shop_profile;
    }
}
