/**
 * This is the module contains all user authentication related pages
 */
import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../directives/shared.module';

import { routing }      from './routing';


import { UserAuthProfileTab }   from './components/user.auth.profile';
import { UserPreferenceTab }    from './components/user.preference';
import { UserBaseProfileTab }   from './components/user.base.profile';
import {UserShippingProfileTab} from './components/user.shipping.profile';
import { UserBabyProfileTab }   from './components/user.baby.profile';
import { UserDomainMgtTab }     from './components/user.domain.mgt';

import { UserPage } from './user';
import { UsersPage } from './users';

@NgModule({
    imports: [ CommonModule, SharedModule, routing ],
    declarations: [
        UserAuthProfileTab, UserPreferenceTab,
        UserBaseProfileTab, UserShippingProfileTab,
        UserBabyProfileTab, UserDomainMgtTab,
        UserPage, UsersPage
    ]
})
export class UserModule {}
