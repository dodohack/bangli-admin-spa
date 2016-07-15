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

    {path: 'posts', component: PostsPage, canActivate: [AuthGuard]},
    /*
    FIXME: children route is bugged due to webpack, see previous FIXME.
    {path: 'posts/:status', component: PostListPage, canActivate: [AuthGuard]},
    */
    {path: 'post/:id', component: PostPage, canActivate: [AuthGuard]},
/*
    {path: 'products/:status', component: ProductListPage, canActivate: [AuthGuard]},
    {path: 'product/:id', component: ProductPage, canActivate: [AuthGuard]},
*/
    /* FIXME: Need to redirect route 'users' to a previous stored route
     * matches following pattern. So that when nav back through sidebar, we can
     * always view the last state of users page.
     */
    {path: 'users', component: UsersPage, canActivate: [AuthGuard]},
    {path: 'users/:role/:page', component: UsersPage, canActivate: [AuthGuard]},
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes) , AuthGuard, AuthService
];