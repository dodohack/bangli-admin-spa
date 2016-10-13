/**
 * Display basic user profile, shop_managers can see this
 */
import { Component, Input } from '@angular/core';

import { USER_GENDERS, User, UserRole } from '../../../models';

@Component({
    selector: 'user-base-profile',
    template: require('./user.base.profile.html')
})
export class UserBaseProfileTab
{
    @Input() isMyProfile: boolean;
    @Input() isSuperUser: boolean;
    @Input() user: User;
    @Input() roles: UserRole[];

    get genders() { return USER_GENDERS; }
}
