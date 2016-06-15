/*
 * This is the entry point of www.huluwa.uk
 */

import { Component }                      from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { Observable }                     from 'rxjs/Observable';

// Add the RxJS operators we need in this app.
import './rxjs-operators';

import { MenuService }      from './service/menu.service';

import { TopbarComponent }  from './components/topbar.ts';
import { HeaderComponent }  from './components/header.ts';
import { FooterComponent }  from './components/footer.ts';

import { HomePage }     from './pages/home.ts';
import { LoginPage }    from './pages/login.ts';
import { RegisterPage } from './pages/register.ts';
import { AccountPage }  from './pages/account.ts';
import { ProductsPage } from './pages/products.ts';
import { Page }    from './pages/page.ts'

@Component({
    selector: 'huluwa-pc-app',
    templateUrl: 'app/app.html',
    directives: [
        ROUTER_DIRECTIVES,
        HeaderComponent,
        TopbarComponent,
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
        path: '/account',
        name: 'Account',
        component: AccountPage
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterPage
    },
    {
        path: '/products',
        name: 'Products',
        component: ProductsPage
    },
    {
        path: '/page/:slug',
        name: 'Page',
        component: Page
    }
])
export class App {

    menus: Observable<string[]>;

    constructor(private menuService: MenuService) {
        this.menus = menuService.menus;
        console.log(this.menus);
    }
}
