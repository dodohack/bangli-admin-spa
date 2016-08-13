/**
 * Display basic user profile, shop_managers can see this
 */
import { Component, Input, AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap';
import { UserService } from '../../service';
import { USER_GENDERS, User } from '../../models/user';

let t = require('./user.base.profile.html');
@Component({
    selector: 'user-base-profile',
    template: t,
    directives: [ ACCORDION_DIRECTIVES ]
})
export class UserBaseProfileTab implements AfterContentInit
{
    @Input()
    uuid: string;
    
    @Input()
    isMyProfile: boolean;
    
    @Input()
    isSuperUser: boolean;

    /* Popup alert shows saving status */
    alert = Array<Object>();
    
    /* FIXME: We should pass user as input from parent component */
    user: User;

    constructor(private userService: UserService) {}

    ngAfterContentInit() {
        this.userService.getUserBaseProfile(this.uuid)
            .subscribe(user => this.user = user);
    }

    get userRoles() { return this.userService.roles; }
    get genders() { return USER_GENDERS; }

    onSubmit() {
        this.userService.postUserBaseProfile(this.uuid, this.user)
            .subscribe(
                ret => {
                    if (ret['status'] == 0)
                        this.alert.push({type: 'success', msg: '保存成功'});
                    else
                        this.alert.push({type: 'danger', msg: '保存失败: ' + ret['msg']});
                });
    }
}
