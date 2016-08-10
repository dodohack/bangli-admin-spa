/**
 * Display backend user website accessibility, role and permission.
 */
import { Component, Input } from '@angular/core';
import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap';

import { WebsiteService } from '../../service';

let t = require('./user.website.mgt.html');
@Component({
    selector: 'user-website-mgt',
    template: t,
    directives: [ ACCORDION_DIRECTIVES ]
})
export class UserWebsiteMgtTab
{
    @Input()
    uuid: string;

    /* All websites */
    availableWebsites: any;

    /* Websites user can access */
    myWebsites: any;
    
    constructor(private websiteService: WebsiteService) {
        this.websiteService.getUserWebsites(this.uuid)
            .subscribe(websites => this.myWebsites = websites);
        this.websiteService.getAvailableWebsites()
            .subscribe(websites => this.availableWebsites = websites);
    }
    
    
}
