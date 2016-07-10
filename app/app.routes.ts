import { provideRouter, RouterConfig } from '@angular/router';

import { AuthGuard }         from './auth/guard';
import { AuthService }       from './service/auth.service';

import { LostPasswordPage }  from './auth/lostpassword';
import { ResetPasswordPage } from './auth/resetpassword';

import { LoginPage }         from './pages/login';
import { RegisterPage }      from './pages/register';
import { LogoutComponent }   from './auth/logout.component';

import { AffiliatePage } from './pages/affiliate';
import { AnalysisPage }  from './pages/analysis';
import { CommentPage }   from './pages/comment';
import { CsPage }        from './pages/cs';
import { DashboardPage } from './pages/dashboard';
import { EmailListPage } from './pages/email_list';
import { EmailPage }     from './pages/email';
import { MigrationPage } from './pages/migration';
import { OrderListPage } from './pages/order_list';
import { OrderPage }     from './pages/order';
import { PageListPage }  from './pages/page_list';
import { PagePage }      from './pages/page';
import { PicturePage }   from './pages/picture';
import { PostListPage }  from './pages/post_list';
import { PostPage }      from './pages/post';
import { ProductListPage } from './pages/product_list';
import { ProductPage }   from './pages/product';
import { SeoPage }       from './pages/seo';
import { SettingPage }   from './pages/setting';
import { TopicPage }     from './pages/topic';
import { UserPage }      from './pages/user';
import { VoucherPage }   from './pages/voucher';
import { WechatPage }    from './pages/wechat';

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

    //{ path: 'affiliate',  component: AffiliatePage },
    //{ path: 'analysis',   component: AnalysisPage },
    //{ path: 'comment', component: },
    //{ path: 'cs', component: },

    {path: 'emails/:status', component: EmailListPage, canActivate: [AuthGuard]},
    {path: 'email/:id', component: EmailPage, canActivate: [AuthGuard]},

    {path: 'migrations', component: MigrationPage, canActivate: [AuthGuard]},

    {path: 'orders/:status', component: OrderListPage, canActivate: [AuthGuard]},
    {path: 'order/:id', component: OrderPage, canActivate: [AuthGuard]},

    {path: 'pages/:status', component: PageListPage, canActivate: [AuthGuard]},
    {path: 'page/:id', component: PagePage, canActivate: [AuthGuard]},

    //{ path: 'picture', component: },

    {path: 'posts', component: PostListPage, canActivate: [AuthGuard]},
    /*
    FIXME: children route is bugged due to webpack, see previous FIXME.
    {path: 'posts/:status', component: PostListPage, canActivate: [AuthGuard]},
    */
    {path: 'post/:id', component: PostPage, canActivate: [AuthGuard]},

    {path: 'products/:status', component: ProductListPage, canActivate: [AuthGuard]},
    {path: 'product/:id', component: ProductPage, canActivate: [AuthGuard]},
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes) , AuthGuard, AuthService
];