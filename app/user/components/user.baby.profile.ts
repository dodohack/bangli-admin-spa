/**
 * Display user baby profiles
 * shop_managers can see this
 */
import { Component, Input, AfterContentInit } from '@angular/core';

let t = require('./user.baby.profile.html');
@Component({
    selector: 'user-baby-profile',
    template: t,
})
export class UserBabyProfileTab implements AfterContentInit
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