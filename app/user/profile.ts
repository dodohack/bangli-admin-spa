/**
 * This is the component used by user itself to set customized settings,
 * some are stored in local storage, some are stored in database.
 */

import { Component, OnInit } from '@angular/core';

import { UserService } from '../service';

let t = require('./profile.html');
@Component({
    template: t,
})
export class UserProfilePage implements OnInit
{
    constructor() {}

    ngOnInit() {}
}
