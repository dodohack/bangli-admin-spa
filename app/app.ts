/*
 * This is the entry point of www.huluwa.uk
 */

import { Component }                      from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { Observable }                     from 'rxjs/Observable';

// Add the RxJS operators we need in this app.
import './rxjs-operators';

//import { MenuService }      from './service/menu.service';

import { MenuComponent }  from './components/menu.ts';
//import { HeaderComponent }  from './components/header.ts';
import { FooterComponent }  from './components/footer.ts';

import { AffiliatePage }     from './pages/affiliate.ts';
import { AnalysisPage }    from './pages/analysis.ts';

import { CommentPage }  from './pages/comment.ts';
import { CsPage } from './pages/cs.ts';
import { EmailPage }    from './pages/email.ts';

import { MigrationPage }  from './pages/migration.ts';
import { ModalPage } from './pages/modal.ts';
import { OrderPage }    from './pages/order.ts';

import { PicturePage }  from './pages/picture.ts';
import { ProductPage } from './pages/product.ts';
import { SeoPage }    from './pages/seo.ts';

import { SettingPage }  from './pages/setting.ts';
import { UserPage } from './pages/user.ts';
import { VoucherPage }    from './pages/voucher.ts';
import { WechatPage }     from './pages/wechat.ts'
import {PagesPage} from "./pages/pages";
import {MenuService} from "./service/menu.service";
import {TopicPage} from "./pages/topic";
import {HomePage} from "./pages/home";
import {PostPage} from "./pages/post";

@Component({
    selector: 'huluwa-pc-app',
    templateUrl: 'app/app.html',
    directives: [
        ROUTER_DIRECTIVES,
        MenuComponent,
        FooterComponent,
    ],
    providers: [MenuService]
})

@RouteConfig([
    {
        path: '/',
        name: 'Home',
        component: HomePage,
        useAsDefault: true
    },
    {
        path: '/affiliate',
        name: 'Affiliate',
        component: AffiliatePage
    },
    {
        path: '/analysis',
        name: 'Analysis',
        component: AnalysisPage
    },
    {
        path: '/post',
        name: 'Post',
        component: PostPage
    },
    {
        path: '/topic',
        name: 'Topic',
        component: TopicPage
    },
    {
        path: '/pages',
        name: 'Pages',
        component: PagesPage
    },
    {
        path: '/comment',
        name: 'Comment',
        component: CommentPage
    },
    {
        path: '/cs',
        name: 'Cs',
        component: CsPage
    },
    {
        path: '/email',
        name: 'Email',
        component: EmailPage
    },
    {
        path: '/migration',
        name: 'Migration',
        component: MigrationPage
    },
    {
        path: '/modal',
        name: 'Modal',
        component: ModalPage
    },
    {
        path: '/order',
        name: 'Order',
        component: OrderPage
    },
    {
        path: '/picture',
        name: 'Picture',
        component: PicturePage
    },
    {
        path: '/product',
        name: 'Product',
        component: ProductPage
    },
    {
        path: '/seo',
        name: 'Seo',
        component: SeoPage
    },
    {
        path: '/setting',
        name: 'Setting',
        component: SettingPage
    },
    {
        path: '/user',
        name: 'User',
        component: UserPage
    },
    {
        path: '/voucher',
        name: 'Voucher',
        component: VoucherPage
    },
    {
        path: '/wechat',
        name: 'Wechat',
        component: WechatPage
    }
])


export class App {

    menus: Observable<string[]>;

    constructor(private menuService: MenuService) {
        this.menus = menuService.menus;
        console.log(this.menus);
    }
}
