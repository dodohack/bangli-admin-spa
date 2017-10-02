/**
 * This is the module contains all user authentication related pages
 */
import { NgModule }     from '@angular/core';
import { SharedModule } from '../directives/shared.module';

import { routing }      from './routing';

import { BbsHome }      from './bbs.home';


@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [
        BbsHome,
    ]
})
export class BbsModule {}
