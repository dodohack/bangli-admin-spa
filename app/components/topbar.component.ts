import { Component } from '@angular/core';

import { AuthService }       from '../service/auth.service';

let template = require('./topbar.html');
@Component({
    selector: 'topbar',
    template: template
})
export class TopbarComponent {

    /* username: string; */

    constructor(/*private authService: AuthService*/) {
        //this.username = authService.getName();
    }
}