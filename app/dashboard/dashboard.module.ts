/**
 * This is the module contains all user authentication related pages
 */
import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { routing }       from './routing';
import { DashboardPage } from './dashboard.page';

@NgModule({
    imports: [ CommonModule, FormsModule, routing ],
    declarations: [ DashboardPage ]
})
export class DashboardModule {}
