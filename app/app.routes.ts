import { provideRouter, RouterConfig } from '@angular/router';

import { AuthGuard }         from './auth/guard';
import { AuthService }       from './service/auth.service';

import { LostPasswordPage }  from './auth/lostpassword';
import { ResetPasswordPage } from './auth/resetpassword';

import { LoginPage }         from './auth/login';
import { RegisterPage }      from './auth/register';
import { LogoutComponent }   from './auth/logout';

import { DashboardPage } from './dashboard/dashboard';
import { PostsPage }     from './cms/posts';
import { PostPage }      from './cms/post';
import { MigrationPage } from './system/migration';
import { UsersPage }     from './users/users';

export const routes: RouterConfig = [

    {path: 'login', component: LoginPage},
    {path: 'logout', component: LogoutComponent},
    {path: 'register', component: RegisterPage},
    {path: 'lost-password', component: LostPasswordPage},
    {path: 'reset-password', component: ResetPasswordPage},

    /**
     * FIXME: Grouped routes(children) is not working, it may caused by using
     * webpack with angular, see https://github.com/angular/angular/issues/9631
     * for detail.
     */
    /* Guard the route so only authenticated user can access */

    {path: '', component: DashboardPage, canActivate: [AuthGuard]},
    /*
    { path: 'affiliate',  component: AffiliatePage },
    { path: 'analysis',   component: AnalysisPage },
    { path: 'comment', component: },
    { path: 'cs', component: },

    {path: 'emails/:status', component: EmailListPage, canActivate: [AuthGuard]},
    {path: 'email/:id', component: EmailPage, canActivate: [AuthGuard]},
*/
    {path: 'migrations', component: MigrationPage, canActivate: [AuthGuard]},
/*
    {path: 'orders/:status', component: OrderListPage, canActivate: [AuthGuard]},
    {path: 'order/:id', component: OrderPage, canActivate: [AuthGuard]},

    {path: 'pages/:status', component: PageListPage, canActivate: [AuthGuard]},
    {path: 'page/:id', component: PagePage, canActivate: [AuthGuard]},
    */
    //{ path: 'picture', component: },

    {
        path: 'posts',
        canActivate: [AuthGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'all/all/1' },
            { path: ':filter/:cond', redirectTo: ':filter/:cond/1' },
            { path: ':filter/:cond/:page', component: PostsPage }
        ]
    },

    /*
    FIXME: children route is bugged due to webpack, see previous FIXME.
    {path: 'posts/:status', component: PostListPage, canActivate: [AuthGuard]},
    */
    {path: 'post/:id', component: PostPage, canActivate: [AuthGuard]},
/*
    {path: 'products/:status', component: ProductListPage, canActivate: [AuthGuard]},
    {path: 'product/:id', component: ProductPage, canActivate: [AuthGuard]},
*/
    {
        /**
         * /users path, UsersPage only will be initialized once for all
         * routes/sub-routes, this prevent page load while switching between
         * different routes.
         */
        path: 'users',
        canActivate: [AuthGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'customer/1' },
            { path: ':role', redirectTo: ':role/1' },
            { path: ':role/:page', component: UsersPage }
        ]
    }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes) , AuthGuard, AuthService
];