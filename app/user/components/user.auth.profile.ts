/**
 * Display user authentication related fields, such as password fields, tokens
 * fields, logged in devices etc
 */
import { Component, Input, AfterContentInit } from '@angular/core';

let t = require('./user.auth.profile.html');
@Component({
    selector: 'user-auth-profile',
    template: t,
})
export class UserAuthProfileTab implements AfterContentInit
{
    @Input()
    uuid: string;

    @Input()
    isMyProfile: boolean;

    @Input()
    isSuperUser: boolean;

    ngAfterContentInit() {

    }
}
