/**
 * Display user authentication related fields, such as password fields, tokens
 * fields, logged in devices etc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { User }  from '../../../models';

@Component({
    selector: 'user-auth-profile',
    template: require('./user.auth.profile.html')
})
export class UserAuthProfileTab
{
    @Input() isMyProfile: boolean;
    @Input() isSuperUser: boolean;
    @Input() user: User;

    @Output() save = new EventEmitter();

    password: string = '';
    password_repeat: string = '';
}
