import { Component } from '@angular/core';
import { Router }    from '@angular/router';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap';

import { AuthService }                  from '../service';
import { DOMAIN_KEYS, DOMAINS, Domain } from '../domain';
import { UserPreference }               from '../preference';

let template = require('./topbar.html');
@Component({
    selector: 'topbar',
    template: template,
    directives: [ DROPDOWN_DIRECTIVES ]
})
export class TopbarComponent {
    
    /* User manageable websites comes from api request from bangli-auth */
    //private websites: any;
    
    constructor(private router: Router,
                private authService: AuthService) {
        //this.authService.getWebsites().subscribe(
        //    websites => this.websites = websites
        //);
    }

    get username() { return this.authService.getName(); }
    get uuid() { return this.authService.getUuid(); }

    get menuColor()    { return UserPreference.menuColor(); }
    get menuBgColor()  { return UserPreference.menuBgColor(); }
    get myTopbarMenus()  { return UserPreference.myTopbarMenus(); }
    
    get DOMAIN_KEYS() { return DOMAIN_KEYS; }
    get DOMAINS() { return DOMAINS; }
    
    get currentDomainName() { return Domain.getName(); }
    get currentDomainUrl() { return Domain.getUrl(); }
    
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
