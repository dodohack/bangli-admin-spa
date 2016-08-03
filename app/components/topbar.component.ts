import { Component } from '@angular/core';
import { Router }    from '@angular/router';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap';

import { PreferenceService } from '../service';
import { AuthService }       from '../service/auth.service';

import { DOMAIN_KEYS, DOMAINS, Domain } from '../domain';

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
    get DOMAIN_KEYS() { return DOMAIN_KEYS; }
    get DOMAINS() { return DOMAINS; }
    get currentDomain() { return Domain.get(); }

    /**
     * Set current managing domain, redirect and refresh
     * @param domain
     */
    private setDomain(key: string) {
        Domain.set(key);
        this.router.navigate(['/']);
        window.location.reload();
    }
}
