/**
 * Show detailed information about a user, includes shop order history,
 * user profile, shop cart state, vouchers, etc.
 * Also used to set customized settings,
 * some are stored in local storage, some are stored in database.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { TAB_DIRECTIVES } from 'ng2-bootstrap';

import { AuthService, UserService } from '../service';
import { UserAuthProfileTab }   from './components/user.auth.profile';
import { UserPreferenceTab }    from './components/user.preference';
import { UserBaseProfileTab }   from './components/user.base.profile';
import { UserShopProfileTab }   from './components/user.shop.profile';
import { UserWebsiteMgtTab }    from './components/user.website.mgt';
import { User }        from "../models";

let t = require('./user.html');
@Component({
    template: t,
    directives: [ TAB_DIRECTIVES,
        UserAuthProfileTab, UserPreferenceTab, 
        UserBaseProfileTab, UserShopProfileTab,
        UserWebsiteMgtTab ]
})
export class UserPage implements OnInit
{
    /* My uuid, may be the same to uuid if editing my profile */
    myUuid: string;
    /* User uuid we are currently editing */
    uuid: string;
    /* The user we are editing */
    user: User;

    constructor(private route: ActivatedRoute,
                private authService: AuthService,
                private userService: UserService) { }

    ngOnInit() {
        this.myUuid = this.authService.getUuid();
        this.initUserUuid();
        this.userService.getUserBaseProfile(this.uuid)
            .subscribe(user => this.user = user);
    }
    
    /* If the user current editing is myself or not */
    get isMyProfile() { return this.myUuid === this.uuid; }

    /* Check if current managed user is a customer or not */
    get isCustomer() {
        /* FIXME: Magic number(table entry huluwa.users.role_id) */
        return this.user.role_id === 5 ? true : false;
    }
    
    private initUserUuid()
    {
        this.route.params.subscribe(segment => this.uuid = segment['uuid']);
    }
}
