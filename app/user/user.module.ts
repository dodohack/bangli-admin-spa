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
import { UserDomainsTab }       from './components/user.domains';
import { UsersList }            from './components/users.list';

import { UserPage }  from './user.page';
import { UsersPage } from './users.page';

@NgModule({
    imports: [ CommonModule, SharedModule, routing ],
    declarations: [
        UsersList,
        UserAuthProfileTab, UserPreferenceTab,
        UserBaseProfileTab, UserShippingProfileTab,
        UserBabyProfileTab, UserDomainsTab,
        UserPage, UsersPage
    ]
})
export class UserModule {}
