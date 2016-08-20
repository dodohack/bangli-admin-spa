import { Routes, RouterModule } from '@angular/router';

import { LoginPage }         from './login';
import { RegisterPage }      from './register';
//import { LostPasswordPage }  from './lostpassword';
//import { ResetPasswordPage } from './resetpassword';
//import { LogoutComponent }   from './logout';

const routes: Routes = [
    {path: 'login',          component: LoginPage},
    {path: 'register',       component: RegisterPage},
    //{path: 'lost-password',  component: LostPasswordPage},
    //{path: 'reset-password', component: ResetPasswordPage}
];

export const routing = RouterModule.forChild(routes);
