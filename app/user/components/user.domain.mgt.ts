/**
 * Display backend user website accessibility, role and permission.
 */
import { Component, Input, AfterContentInit } from '@angular/core';
import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap';

import { User }            from '../../models';
import { Domain, DOMAINS } from '../../models/domain'
import { AuthService }     from '../../service';
import { DomainService }   from '../../service';

let t = require('./user.domain.mgt.html');
@Component({
    selector: 'user-domain-mgt',
    template: t,
    directives: [ ACCORDION_DIRECTIVES ]
})
export class UserDomainMgtTab implements AfterContentInit
{
    @Input()
    uuid: string;

    @Input()
    isMyProfile: boolean;
    
    @Input()
    isSuperUser: boolean;

    /* Websites user can access */
    domains: Domain[] = [];
    
    /* My domains for dashboard user */
    myDomains: Domain[] = [];

    constructor(private authService: AuthService,
                private domainService: DomainService) {}

    /* Can not get @Input before this point */
    ngAfterContentInit() {
        /* Get my domains */
        this.myDomains = this.authService.domains;
        
        /* Init user domain */
        for (let i = 0; i < DOMAINS.length; i++) {
            this.domains.push(new Domain(DOMAINS[i]));
        }
            
        this.domainService.getDomains(this.uuid)
            .subscribe(domains => {
                for (let i = 0; i < this.domains.length; i++) {
                    this.domains[i].checked = false;
                    for (let j = 0; j < domains.length; j++) {
                        if (this.domains[i].key == domains[j].key) {
                            this.domains[i].checked = true;
                            break;
                        }
                    }
                }
            });
    }

    /* Save user manageable websites to bangli-auth.user_website */
    onSubmitDomains() {
        // Submit allWebsites which contains checked status
        this.domainService.postDomains(this.uuid, this.domains)
            .subscribe(status => console.log(status));
    }

    /* Save per website permssions for user to business api server */
    onSubmitDomainPerms() {
    }

}
