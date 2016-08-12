/**
 * Display backend user website accessibility, role and permission.
 */
import { Component, Input, AfterContentInit } from '@angular/core';
import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap';

import { User } from '../../models';
import { Domain, DOMAINS } from '../../models/domain'
import { DomainService } from '../../service';

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

    /* Websites user can access */
    domains: Domain[];

    constructor(private domainService: DomainService) {}

    /* Can not get @Input before this point */
    ngAfterContentInit() {
        if (this.isMyProfile) {
            /* Get my domains */
            this.domains = this.domainService.domains;
        } else {
            /* Get user domains */
            this.domains = DOMAINS;
            this.domainService.getUserDomains(this.uuid)
                .subscribe(domains => {
                    for (let i = 0; i < this.domains.length; i++) {
                        for (let j = 0; j < domains.length; j++) {
                            if (this.domains[i].key == domains[j].key) {
                                this.domains[i].checked = true;
                                break;
                            }
                        }
                    }
                });
        }
    }

    /* Save user manageable websites to bangli-auth.user_website */
    onSubmitDomains() {
        // Submit allWebsites which contains checked status
        this.domainService.postUserWebsites(this.uuid, this.domains)
            .subscribe(status => console.log(status));
    }

    /* Save per website permssions for user to business api server */
    onSubmitDomainPerms() {
    }

}
