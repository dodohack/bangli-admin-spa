/**
 * Display user authentication related fields, such as password fields, tokens
 * fields, logged in devices etc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { AuthService } from '../../service';
import { User }        from '../../models';

let t = require('./user.auth.profile.html');
@Component({
    selector: 'user-auth-profile',
    template: t,
})
export class UserAuthProfileTab
{
    @Input()
    uuid: string;

    @Input()
    isMyProfile: boolean;

    @Input()
    isSuperUser: boolean;

    @Input()
    user: User;

    @Output()
    alerts = new EventEmitter();

    password: string = '';
    password_repeat: string = '';
    
    constructor(private authService: AuthService) {}

    /**
     * Save user password to bangli-auth for given uuid
     */
    onSubmit() 
    {
        /* Authentication is needed for changing password */
        let form = 'uuid=' + this.user.uuid + '&password=' + this.password +
            '&token=' + this.authService.jwt;
        this.authService.postUpdatePassword(form)
            .subscribe(
                ret => this.alerts.emit(ret),
                err => this.alerts.emit({'status': 1, 'msg': err._body })
            );
    }
}
