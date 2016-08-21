/**
 * This is the module contains all user authentication related pages
 */
import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { TAB_DIRECTIVES }       from 'ng2-bootstrap';
import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap';

import { routing }      from './routing';

import { ListPageHeaderComponent } from '../components';
import { PaginatorComponent }      from '../components';
import { UserAuthProfileTab }   from './components/user.auth.profile';
import { UserPreferenceTab }    from './components/user.preference';
import { UserBaseProfileTab }   from './components/user.base.profile';
import {UserShippingProfileTab} from './components/user.shipping.profile';
import { UserBabyProfileTab }   from './components/user.baby.profile';
import { UserDomainMgtTab }     from './components/user.domain.mgt';

import { UserPage } from './user';
import { UsersPage } from './users';

@NgModule({
    imports: [ CommonModule, FormsModule, routing ],
    declarations: [
        TAB_DIRECTIVES,
        ACCORDION_DIRECTIVES,
        ListPageHeaderComponent, PaginatorComponent,
        UserAuthProfileTab, UserPreferenceTab,
        UserBaseProfileTab, UserShippingProfileTab,
        UserBabyProfileTab, UserDomainMgtTab,
        UserPage, UsersPage
    ],
    exports: [ 
        ListPageHeaderComponent, 
        PaginatorComponent,
        TAB_DIRECTIVES,
        ACCORDION_DIRECTIVES
    ]
})
export class UserModule {}
