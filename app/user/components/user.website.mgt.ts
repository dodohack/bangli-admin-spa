/**
 * Display backend user website accessibility, role and permission.
 */
import { Component, Input, AfterContentInit } from '@angular/core';
import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap';

import { Website, User } from '../../models';
import { WebsiteService } from '../../service';

let t = require('./user.website.mgt.html');
@Component({
    selector: 'user-website-mgt',
    template: t,
    directives: [ ACCORDION_DIRECTIVES ]
})
export class UserWebsiteMgtTab implements AfterContentInit
{
    @Input()
    uuid: string;

    /* Websites user can access */
    websites: Website[];
    
    constructor(private websiteService: WebsiteService) {}

    /* Can not get @Input before this point */
    ngAfterContentInit() {
        this.websiteService.getUserWebsites(this.uuid)
            .subscribe(websites => {
                this.websites = this.websiteService.initCheckStatus(
                    websites['all_websites'], 
                    websites['my_websites']
                );
            });
    }

    /* Save user manageable websites to bangli-auth.user_website */
    onSubmitWebsites() {
        // Submit allWebsites which contains checked status
        this.websiteService.saveUserWebsites(this.uuid, this.websites)
            .subscribe(status => console.log(status));
    }

    /* Save per website permssions for user to business api server */
    onSubmitWebsitePerms() {
    }

}
