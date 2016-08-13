/**
 * Display user shop related profile, such as orders, content of carts,
 * shop_managers can see this
 */
import { Component, Input, AfterContentInit } from '@angular/core';

let t = require('./user.shop.profile.html');
@Component({
    selector: 'user-shop-profile',
    template: t,
})
export class UserShopProfileTab implements AfterContentInit
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