/**
 * Display basic user profile, shop_managers can see this
 */
import { Component, Input, AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap';
import { UserService } from '../../service';
import { USER_GENDERS } from '../../models/user';

let t = require('./user.base.profile.html');
@Component({
    selector: 'user-base-profile',
    template: t,
    directives: [ ACCORDION_DIRECTIVES ]
})
export class UserBaseProfile implements AfterContentInit
{
    @Input()
    uuid: string;

    user: Observable<any>;

    constructor(private userService: UserService) {}

    ngAfterContentInit() {
        this.userService.getUserBaseProfile(this.uuid)
            .subscribe(user => this.user = user);
    }

    get userRoles() { return this.userService.roles; }
    get genders() { return USER_GENDERS; }
}
