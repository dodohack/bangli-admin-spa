/**
 * Display basic user profile, shop_managers can see this
 */
import { Component, Input, AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../service';

let t = require('./user.base.profile.html');
@Component({
    selector: 'user-base-profile',
    template: t,
})
export class UserBaseProfile implements AfterContentInit
{
    @Input()
    uuid: string;

    user: Observable<any>;

    constructor(private userService: UserService) {
    }

    ngAfterContentInit() {
        console.log("UUID: ", this.uuid);
        this.userService.getUserBaseProfile(this.uuid)
            .subscribe(user => this.user = user);
    }
}
