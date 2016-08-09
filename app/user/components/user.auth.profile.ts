/**
 * Display user authentication related fields, such as password fields, tokens
 * fields, logged in devices etc
 */
import { Component } from '@angular/core';

let t = require('./user.auth.profile.html');
@Component({
    selector: 'user-auth-profile',
    template: t,
})
export class UserAuthProfile 
{
}
