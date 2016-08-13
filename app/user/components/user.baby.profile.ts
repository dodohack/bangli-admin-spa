/**
 * Display user baby profiles
 * shop_managers can see this
 */
import { Component, Input } from '@angular/core';
import { User } from "../../models";

let t = require('./user.baby.profile.html');
@Component({
    selector: 'user-baby-profile',
    template: t,
})
export class UserBabyProfileTab
{
    @Input()
    uuid: string;

    @Input()
    isMyProfile: boolean;

    @Input()
    isSuperUser: boolean;

    @Input()
    user: User;
}