/**
 * Display backend user website accessibility, role and permission.
 */
import { Component, Input, Output }   from '@angular/core';
import { EventEmitter}                from '@angular/core';
import { ChangeDetectionStrategy }    from '@angular/core';

import { User }            from '../../models';
import { Domain, DOMAINS } from '../../models/domain'

@Component({
    selector: 'user-domains-tab',
    template: require('./user.domains.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDomainsTab
{
    @Input()
    _user: User;
    @Input() set user(value) { this._user = Object.assign({}, value); }
    get user() { return this._user; }

    @Input()
    isSuperUser: boolean;

    /* Domains user can access */
    /*
    _domains: Domain[];
    @Input() set domains(value) { this._domains = Object.assign({}, value); }
    get domains() { return this._domains; }
    */

    @Output()
    save = new EventEmitter();

    get domains() { return this._user.domains; }

    /* Can not get @Input before this point */
    /*
    ngAfterContentInit() {
        // Get my domains
        this.myDomains = this.authService.domains;
        
        // Init user domain
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
    */

    /*
    get userRoles() { return this.userService.roles; }

    // Save user manageable websites to bangli-auth.user_website
    onSubmitDomains() {
        console.log("domains to be submitted:", this.domains);
        // Submit allWebsites which contains checked status
        this.domainService.postDomains(this.uuid, this.domains)
            .subscribe(ret => this.alerts.emit(ret));
    }
    */

    /* Save per website permssions for user to business api server */
    onSubmitDomainPerms() {
    }

}
