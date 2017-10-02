/**
 * Display basic user profile, shop_managers can see this
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { USER_GENDERS, User, UserRole } from '../../../models';

@Component({
    selector: 'user-base-profile',
    templateUrl: './user.base.profile.html'
})
export class UserBaseProfileTab
{
    @Input() isMyProfile: boolean;
    @Input() isAdminUser: boolean;
    @Input() roles: UserRole[];

    _user: User;
    @Input() set user(v) { this._user = Object.assign({}, v); }
    get user() { return this._user; }

    @Output() save = new EventEmitter();

    get genders() { return USER_GENDERS; }
}
