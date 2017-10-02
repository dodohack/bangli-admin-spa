/**
 * Display user authentication related fields, such as password fields, tokens
 * fields, logged in devices etc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { AuthUser }  from '../../../models';

@Component({
    selector: 'user-auth-profile',
    template: require('./user.auth.profile.html')
})
export class UserAuthProfileTab
{
    @Input() isMyProfile: boolean;
    @Input() isSuperUser: boolean;

    _user: AuthUser;
    @Input() set user(u: AuthUser) { this._user = Object.assign({}, u); }
    get user() { return this._user; }

    @Output() save = new EventEmitter();
}
