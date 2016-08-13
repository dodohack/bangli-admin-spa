/**
 * Show detailed information about a user, includes shop order history,
 * user profile, shop cart state, vouchers, etc.
 * Also used to set customized settings,
 * some are stored in local storage, some are stored in database.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { TAB_DIRECTIVES } from 'ng2-bootstrap';

import { AuthService }          from '../service';
import { UserAuthProfileTab }   from './components/user.auth.profile';
import { UserPreferenceTab }    from './components/user.preference';
import { UserBaseProfileTab }   from './components/user.base.profile';
import { UserShopProfileTab }   from './components/user.shop.profile';
import { UserBabyProfileTab }   from './components/user.baby.profile';
import { UserDomainMgtTab }     from './components/user.domain.mgt';

let t = require('./user.html');
@Component({
    template: t,
    directives: [ TAB_DIRECTIVES,
        UserAuthProfileTab, UserPreferenceTab, 
        UserBaseProfileTab, UserShopProfileTab,
        UserBabyProfileTab, UserDomainMgtTab ]
})
export class UserPage implements OnInit
{
    /* uuid of current editing user */
    uuid: string;

    constructor(private route: ActivatedRoute,
                private authService: AuthService) { }

    ngOnInit() {
        this.route.params.subscribe(segment => this.uuid = segment['uuid']);
    }
    
    /* If the user current editing is myself or not */
    get isMyProfile() { return this.authService.uuid === this.uuid; }
    
    /* Am I super user */
    get isSuperUser() { return this.authService.isSuperUser; }
}
