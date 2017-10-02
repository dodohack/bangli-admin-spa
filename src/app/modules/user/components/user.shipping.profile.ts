/**
 * Display user shop related profile, such as orders, content of carts,
 * shop_managers can see this
 */
import { Component, Input } from '@angular/core';
import { User } from '../../../models';

import { zh_CN } from '../../../localization';

@Component({
    selector: 'user-shipping-profile',
    templateUrl: './user.shipping.profile.html'
})
export class UserShippingProfileTab
{
    @Input() isMyProfile: boolean;
    @Input() isAdminUser: boolean;
    @Input() user: User;
    
    get zh() { return zh_CN.user; }

    get hasShippingProfile() {
        return this.user && this.user.addresses
            && this.user.addresses.length > 0;
    }
}