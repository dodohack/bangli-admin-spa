/**
 * Display user baby profiles
 * shop_managers can see this
 */
import { Component, Input } from '@angular/core';
import { User } from "../../../models";

@Component({
    selector: 'user-baby-profile',
    template: require('./user.baby.profile.html')
})
export class UserBabyProfileTab
{
    @Input()
    isMyProfile: boolean;

    @Input()
    isSuperUser: boolean;

    @Input()
    user: User;
}