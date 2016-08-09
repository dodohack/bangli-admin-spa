/**
 * Display dashboard user local settings, only users can use dashboard will have
 * this displayed
 */
import { Component } from '@angular/core';

let t = require('./user.preference.html');
@Component({
    selector: 'user-preference',
    template: t,
})
export class UserPreference
{

}
