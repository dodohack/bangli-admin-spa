/**
 * This is the login page for backend
 */

import { Component }         from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NgForm }            from '@angular/forms';

@Component({
    templateUrl: 'app/auth/login.html',
    directives: [ROUTER_DIRECTIVES]
})
export class LoginPage
{
    constructor() {}
}