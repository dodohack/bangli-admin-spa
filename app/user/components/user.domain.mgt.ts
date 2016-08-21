/**
 * Display backend user website accessibility, role and permission.
 */
import { Component, Input, Output}       from '@angular/core';
import {EventEmitter, AfterContentInit } from '@angular/core';

import { User }            from '../../models';
import { Domain, DOMAINS } from '../../models/domain'
import { AuthService }     from '../../service';
import { UserService }     from '../../service';
import { DomainService }   from '../../service';

@Component({
    selector: 'user-domain-mgt',
    template: require('./user.domain.mgt.html'),
    providers: [ DomainService ]
})
export class UserDomainMgtTab implements AfterContentInit
{
    @Input()
    uuid: string;

    @Input()
    auth;

    @Input()
    isMyProfile: boolean;
    
    @Input()
    isSuperUser: boolean;

    @Output()
    alerts = new EventEmitter();

    /* Websites user can access */
    domains: Domain[] = [];
    
    /* My domains for dashboard user */
    myDomains: Domain[] = [];

    constructor(private authService: AuthService,
                private userService: UserService,
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

    get userRoles() { return this.userService.roles; }

    /* Save user manageable websites to bangli-auth.user_website */
    onSubmitDomains() {
        console.log("domains to be submitted:", this.domains);
        // Submit allWebsites which contains checked status
        this.domainService.postDomains(this.uuid, this.domains)
            .subscribe(ret => this.alerts.emit(ret));
    }

    /* Save per website permssions for user to business api server */
    onSubmitDomainPerms() {
    }

}
