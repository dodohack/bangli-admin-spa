/**
 * Display list of users
 */

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    templateUrl: 'app/pages/user.html',
    directives: [ROUTER_DIRECTIVES]
})
export class UserPage
{
    constructor() {}
}
