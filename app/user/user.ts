/**
 * Show detailed information about a user, includes shop order history,
 * user profile, shop cart state, vouchers, etc.
 * Also used to set customized settings,
 * some are stored in local storage, some are stored in database.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { TAB_DIRECTIVES } from 'ng2-bootstrap';

import { AuthService }       from '../service';
import { UserAuthProfile }   from './components/user.auth.profile';
import { UserPreference }    from './components/user.preference';
import { UserBaseProfile }   from './components/user.base.profile';
import { UserShopProfile }   from './components/user.shop.profile';


let t = require('./user.html');
@Component({
    template: t,
    directives: [ TAB_DIRECTIVES,
        UserAuthProfile, UserPreference, UserBaseProfile, UserShopProfile ]
})
export class UserPage implements OnInit
{
    /* My uuid, may be the same to uuid if editing my profile */
    myUuid: string;
    /* User uuid we are currently editing */
    uuid: string;
    
    constructor(private route: ActivatedRoute,
                private authService: AuthService) {}

    ngOnInit() {
        this.myUuid = this.authService.getUuid();
        this.initUserUuid();
    }
    
    get isMyProfile() { return this.myUuid === this.uuid; }
    
    private initUserUuid()
    {
        this.route.params.subscribe(segment => this.uuid = segment['uuid']);   
    }
}
