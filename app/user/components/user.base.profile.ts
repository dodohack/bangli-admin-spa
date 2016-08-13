/**
 * Display basic user profile, shop_managers can see this
 */
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../service';
import { USER_GENDERS, User } from '../../models';

let t = require('./user.base.profile.html');
@Component({
    selector: 'user-base-profile',
    template: t,
})
export class UserBaseProfileTab
{
    @Input()
    uuid: string;
    
    @Input()
    isMyProfile: boolean;
    
    @Input()
    isSuperUser: boolean;
    
    @Input()
    user: User;

    constructor(private userService: UserService) {}
    
    get userRoles() { return this.userService.roles; }
    get genders() { return USER_GENDERS; }
}
