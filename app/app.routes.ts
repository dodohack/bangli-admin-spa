import { provideRouter, RouterConfig } from '@angular/router';

import { LoginPage }         from './auth/login';
import { RegisterPage }      from './auth/register';
import { LostPasswordPage }  from './auth/lostpassword';
import { ResetPasswordPage } from './auth/resetpassword';

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
    { path: '',                 component: DashboardPage },

    { path: 'login',            component: LoginPage },
    { path: 'register',         component: RegisterPage },
    { path: 'lost-password',    component: LostPasswordPage },
    { path: 'reset-password',   component: ResetPasswordPage },

    //{ path: 'affiliate',  component: AffiliatePage },
    //{ path: 'analysis',   component: AnalysisPage },
    //{ path: 'comment', component: },
    //{ path: 'cs', component: },

    { path: 'emails/:status',   component: EmailListPage },
    { path: 'email/:id',        component: EmailPage },

    { path: 'migration',        component: MigrationPage },

    { path: 'orders/:status',   component: OrderListPage },
    { path: 'order/:id',        component: OrderPage },

    { path: 'pages/:status',    component: PageListPage },
    { path: 'page/:id',         component: PagePage },

    //{ path: 'picture', component: },

    { path: 'posts/:status',    component: PostListPage },
    { path: 'post/:id',         component: PostPage },

    { path: 'products/:status', component: ProductListPage },
    { path: 'product/:id',      component: ProductPage },

];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];