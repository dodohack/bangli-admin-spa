/**
 * Display basic user profile, shop_managers can see this
 */
import { Component, Input } from '@angular/core';

import { USER_GENDERS, User } from '../../models';

@Component({
    selector: 'user-base-profile',
    template: require('./user.base.profile.html')
})
export class UserBaseProfileTab
{
    @Input()
    isMyProfile: boolean;
    
    @Input()
    isSuperUser: boolean;
    
    @Input()
    user: User;
    
    get userRoles() { return ['a', 'b', 'c']; /*return this.userService.roles;*/ }
    get genders() { return USER_GENDERS; }
}
