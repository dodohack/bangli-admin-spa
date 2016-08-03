import { Component } from '@angular/core';
import { Router }    from '@angular/router';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap';

import { PreferenceService } from '../service';
import { AuthService }       from '../service/auth.service';

import { DOMAINS, Domain } from '../domain';

let template = require('./topbar.html');
@Component({
    selector: 'topbar',
    template: template,
    directives: [ DROPDOWN_DIRECTIVES ],
    providers: [ PreferenceService ]
})
export class TopbarComponent {

    /* username: string; */

    constructor(private preferenceService: PreferenceService,
                private router: Router
                /*private authService: AuthService*/) {
        //this.username = authService.getName();
    }

    get preference() { return this.preferenceService; }
    get DOMAINS() { return DOMAINS; }

    /**
     * Set current managing domain, redirect and refresh
     * @param domain
     */
    private setDomain(domain: string) {
        Domain.set(domain);
        this.router.navigate(['/']);
        window.location.reload();
    }
}
