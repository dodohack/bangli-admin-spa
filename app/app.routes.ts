import { provideRouter, RouterConfig } from '@angular/router';

import { AuthGuard }         from './auth/guard';
import { AuthService }       from './service/auth.service';

import { LostPasswordPage }  from './auth/lostpassword';
import { ResetPasswordPage } from './auth/resetpassword';
import { LoginPage }         from './auth/login';
import { RegisterPage }      from './auth/register';
import { LogoutComponent }   from './auth/logout';
import { VouchersPage }  from './shop/vouchers';
import { VoucherPage }   from './shop/voucher';
import { EmailHomePage }      from './email/index';
import { NewslettersPage }    from './email/newsletters';
import { NewsletterPage }     from './email/newsletter';
import { EmailTemplatesPage } from './email/templates';
import { EmailTemplatePage }  from './email/template';
import { ProductCategoriesPage } from './system/product-categories';

import { dashboardRoutes } from './dashboard';
import { shopRoutes }      from './shop';
import { cmsRoutes }       from './cms';
import { galleryRoutes }   from './gallery';
import { userRoutes }      from './user';
import { migrationRoutes } from './migration';

export const routes: RouterConfig = [

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

    /* Email management, FIXME: root path can't have a component! */
    {
        path: 'email',
        canActivate: [AuthGuard],
        children: [
            { path: '', component: EmailHomePage },
            {
                path: 'templates',
                children: [
                    { path: '', pathMatch: 'full', redirectTo: '1' },
                    { path: ':page', component: EmailTemplatesPage }
                ]
            },

            {
                // New/Edit single email template
                path: 'template',
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'new' },
                    { path: ':id', component: EmailTemplatePage }
                ]
            },

            {
                path: 'newsletters',
                children: [
                    { path: '', pathMatch: 'full', redirectTo: '1' },
                    { path: ':page', component: NewslettersPage }
                ]
            },
            {
                // New/Edit newsletter
                path: 'newsletter',
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'new' },
                    { path: ':id', component: NewsletterPage }
                ]
            }
        ]
    },

    /*
    { path: 'affiliate',  component: AffiliatePage },
    { path: 'analysis',   component: AnalysisPage },
    { path: 'comment', component: },
    { path: 'cs', component: },
    */

    ...cmsRoutes,
    ...userRoutes,
    
    ...migrationRoutes
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes) , AuthGuard, AuthService
];