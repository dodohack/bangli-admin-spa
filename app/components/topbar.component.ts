import { Component } from '@angular/core';

import { PreferenceService } from '../service';
import { AuthService }       from '../service/auth.service';

let template = require('./topbar.html');
@Component({
    selector: 'topbar',
    template: template,
    providers: [ PreferenceService ]
})
export class TopbarComponent {

    /* username: string; */

    constructor(private preferenceService: PreferenceService
                /*private authService: AuthService*/) {
        //this.username = authService.getName();
    }

    get preference() { return this.preferenceService; }
}