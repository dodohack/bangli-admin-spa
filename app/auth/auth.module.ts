/**
 * This is the module contains all user authentication related pages
 */
import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { routing }      from './routing';
import { LoginForm }    from './components';
import { RegisterForm } from './components';
import { LoginPage }    from './login.page';
import { RegisterPage } from './register.page';

@NgModule({
    imports: [ CommonModule, FormsModule, routing ],
    declarations: [ LoginForm, RegisterForm, LoginPage, RegisterPage ]
})
export class AuthModule {}
