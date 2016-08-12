import { Routes, RouterModule } from '@angular/router';

import { AuthGuard }         from './auth/guard';
import { AuthService }       from './service/auth.service';

import { LostPasswordPage }  from './auth/lostpassword';
import { ResetPasswordPage } from './auth/resetpassword';
import { LoginPage }         from './auth/login';
import { RegisterPage }      from './auth/register';
import { LogoutComponent }   from './auth/logout';
import { VouchersPage }      from './shop/vouchers';
import { VoucherPage }       from './shop/voucher';
import { ProductCategoriesPage } from './system/product-categories';

import { dashboardRoutes } from './dashboard/routes';
import { shopRoutes }      from './shop/routes';
import { cmsRoutes }       from './cms/routes';
import { galleryRoutes }   from './gallery/routes';
import { userRoutes }      from './user/routes';
import { emailRoutes }     from './email/routes';
import { migrationRoutes } from './migration/routes';

const appRoutes: Routes = [

    {path: 'login', component: LoginPage},
    {path: 'logout', component: LogoutComponent},
    {path: 'register', component: RegisterPage},
    {path: 'lost-password', component: LostPasswordPage},
    {path: 'reset-password', component: ResetPasswordPage},

    ...dashboardRoutes,
    ...shopRoutes,
    ...galleryRoutes,

    {path: 'categories/product', component: ProductCategoriesPage, canActivate: [AuthGuard]},
 

    {
        path: 'vouchers',
        canActivate: [AuthGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'all/all/1' },
            { path: ':filter/:cond', redirectTo: ':filter/:cond/1' },
            { path: ':filter/:cond/:page', component: VouchersPage }
        ]
    },

    {
        path: 'voucher',
        canActivate: [AuthGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'new' },
            { path: ':id', component: VoucherPage }
        ]
    },


    /*
    { path: 'affiliate',  component: AffiliatePage },
    { path: 'analysis',   component: AnalysisPage },
    { path: 'comment', component: },
    { path: 'cs', component: },
    */
    ...emailRoutes,
    ...cmsRoutes,
    ...userRoutes,
    
    ...migrationRoutes
];

export const routing = RouterModule.forRoot(appRoutes);
