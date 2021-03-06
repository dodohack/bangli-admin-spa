/**
 * This is the module contains all user authentication related pages
 */
import { NgModule }     from '@angular/core';
import { SharedModule } from '../directives/shared.module';

import { routing }      from './routing';

import { UserAuthProfileTab }     from './components/user.auth.profile';
import { UserPreferenceTab }      from './components/user.preference';
import { UserBaseProfileTab }     from './components/user.base.profile';
import { UserDomainsTab }         from './components/user.domains';
import { UserList }               from './components/user.list';

import { UserPage }  from './user.page';
import { UsersPage } from './users.page';
import { DomainsPage } from './domains.page';

@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [
        UserList,
        UserAuthProfileTab,
        UserPreferenceTab,
        UserBaseProfileTab,
        UserDomainsTab,
        UserPage,
        UsersPage,
        DomainsPage
    ]
})
export class UserModule {}
