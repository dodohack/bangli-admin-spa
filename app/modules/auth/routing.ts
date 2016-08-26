import { Routes, RouterModule } from '@angular/router';

import { UnauthGuard }       from '../../guard';
import { LoginPage }         from './login.page';
import { RegisterPage }      from './register.page';
//import { LostPasswordPage }  from './lostpassword';
//import { ResetPasswordPage } from './resetpassword';

const routes: Routes = [
    {path: 'login',          component: LoginPage,    canActivate: [UnauthGuard]},
    {path: 'register',       component: RegisterPage, canActivate: [UnauthGuard]},
    //{path: 'lost-password',  component: LostPasswordPage, canActivate: [UnauthGuard]},
    //{path: 'reset-password', component: ResetPasswordPage, canActivate: [UnauthGuard]}
];

export const routing = RouterModule.forChild(routes);
