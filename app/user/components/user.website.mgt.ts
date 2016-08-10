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
    directives: [ ACCORDION_DIRECTIVES ],
    providers: [ WebsiteService ]
})
export class UserWebsiteMgtTab implements AfterContentInit
{
    @Input()
    uuid: string;

    /* Websites user can access */
    myWebsites: Website[];
    allWebsites: Website[];
    
    constructor(private websiteService: WebsiteService) {}

    /* Can not get @Input before this point */
    ngAfterContentInit() {
        this.websiteService.getUserWebsites(this.uuid)
            .subscribe(websites => {
                this.myWebsites  = websites['my_websites'];
                this.allWebsites = websites['all_websites'];
                this.initCheckStatus();
            });
    }

    /* Save user manageable websites to bangli-auth.user_website */
    onSubmitWebsites() {
        // Submit allWebsites which contains checked status
        this.websiteService.saveUserWebsites(this.uuid, this.allWebsites)
            .subscribe(status => console.log(status));
    }

    /* Save per website permssions for user to business api server */
    onSubmitWebsitePerms() {
    }

    private initCheckStatus() {
        let allLength = this.allWebsites.length;
        let myLength  = this.myWebsites.length;
        /* Initial check status */
        for (let i = 0; i < allLength; i++) {
            this.allWebsites[i].checked = false;
            for (let j = 0; j < myLength; j++) {
                if (this.allWebsites[i].id == this.myWebsites[j].id) {
                    this.allWebsites[i].checked = true;
                    break;
                }
            }
        }
    }
}
