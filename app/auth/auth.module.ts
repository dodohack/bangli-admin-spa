/**
 * This is the module contains all user authentication related pages
 */
import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { routing }      from './routing';

import { LoginPage }       from './login';
import { RegisterPage }    from './register';

@NgModule({
    imports: [ CommonModule, FormsModule, routing ],
    declarations: [ LoginPage, RegisterPage ]
})
export class AuthModule {}
