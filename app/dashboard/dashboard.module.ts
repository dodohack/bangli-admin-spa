/**
 * This is the module contains all user authentication related pages
 */
import { NgModule }     from '@angular/core';
import { SharedModule } from '../directives/shared.module';

import { routing }       from './routing';
import { DashboardPage } from './dashboard.page';

@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [ DashboardPage ]
})
export class DashboardModule {}
