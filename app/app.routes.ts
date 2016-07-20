import { provideRouter, RouterConfig } from '@angular/router';

import { AuthGuard }         from './auth/guard';
import { AuthService }       from './service/auth.service';

import { LostPasswordPage }  from './auth/lostpassword';
import { ResetPasswordPage } from './auth/resetpassword';

import { LoginPage }         from './auth/login';
import { RegisterPage }      from './auth/register';
import { LogoutComponent }   from './auth/logout';

import { DashboardPage } from './dashboard/dashboard';

import { ImagesPage }     from './attachment/images';

import { ProductsPage }  from './shop/products';
import { ProductPage }   from './shop/product';
import { OrdersPage }    from './shop/orders';
import { OrderPage }     from './shop/order';
import { VouchersPage }  from './shop/vouchers';
import { VoucherPage }   from './shop/voucher';

import { PostsPage }     from './cms/posts';
import { PostPage }      from './cms/post';
import { TopicsPage }    from './cms/topics';
import { TopicPage }     from './cms/topic';
import { PagesPage }     from './cms/pages';
import { PagePage }      from './cms/page';

import { EmailHomePage }      from './email/index';
import { NewslettersPage }    from './email/newsletters';
import { NewsletterPage }     from './email/newsletter';
import { EmailTemplatesPage } from './email/templates';
import { EmailTemplatePage }  from './email/template';

import { MigrationPage } from './system/migration';
import { UsersPage }     from './users/users';

export const routes: RouterConfig = [

    {path: 'login', component: LoginPage},
    {path: 'logout', component: LogoutComponent},
    {path: 'register', component: RegisterPage},
    {path: 'lost-password', component: LostPasswordPage},
    {path: 'reset-password', component: ResetPasswordPage},

    /* Guard the route so only authenticated user can access */

    {path: '', component: DashboardPage, canActivate: [AuthGuard]},

    {path: 'pictures', component: ImagesPage, canActivate: [AuthGuard]},

    {
        /**
         * Products path
         */
        path: 'products',
        canActivate: [AuthGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'all/1' },
            { path: ':status', redirectTo: ':status/1' },
            { path: ':status/:page', component: ProductsPage }
        ]
    },
    {
        /**
         * Product path
         */
        path: 'product',
        canActivate: [AuthGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'new' },
            { path: ':id', component: ProductPage },
        ]
    },

    {
        path: 'orders',
        canActivate: [AuthGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'all/1' },
            { path: ':status', redirectTo: ':status/1' },
            { path: ':status/:page', component: OrdersPage }
        ]
    },

    {
        path: 'order',
        canActivate: [AuthGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'new' },
            { path: ':id', component: OrderPage }
        ]
    },

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
    {path: 'migrations', component: MigrationPage, canActivate: [AuthGuard]},
    //{ path: 'picture', component: },

    {
        /**
         * /posts path
         */
        path: 'posts',
        canActivate: [AuthGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'all/all/1' },
            { path: ':filter/:cond', redirectTo: ':filter/:cond/1' },
            { path: ':filter/:cond/:page', component: PostsPage }
        ]
    },
    {
        /**
         * /post path
         */
        path: 'post',
        canActivate: [AuthGuard],
        children: [
            /* Redirect to create a new post /post/new */
            { path: '', pathMatch: 'full', redirectTo: 'new' },
            /* Edit a post/Create a new post */
            { path: ':id', component: PostPage }
        ]
    },

    {
        /**
         * /topics path
         */
        path: 'topics',
        canActivate: [AuthGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'all/all/1' },
            { path: ':filter/:cond', redirectTo: ':filter/:cond/1' },
            { path: ':filter/:cond/:page', component: TopicsPage }
        ]
    },
    {
        /**
         * /topic path
         */
        path: 'topic',
        canActivate: [AuthGuard],
        children: [
            /* Redirect to create a new topic /topic/new */
            { path: '', pathMatch: 'full', redirectTo: 'new' },
            /* Edit a topic/Create a new topic */
            { path: ':id', component: TopicPage }
        ]
    },

    {
        /**
         * /pages path
         */
        path: 'pages',
        canActivate: [AuthGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'all/all/1' },
            { path: ':filter/:cond', redirectTo: ':filter/:cond/1' },
            { path: ':filter/:cond/:page', component: PagesPage }
        ]
    },
    {
        /**
         * /page path
         */
        path: 'page',
        canActivate: [AuthGuard],
        children: [
            /* Redirect to create a new page /page/new */
            { path: '', pathMatch: 'full', redirectTo: 'new' },
            /* Edit a page/Create a new page */
            { path: ':id', component: PagePage }
        ]
    },

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