import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { Title }         from '@angular/platform-browser';

import { UnauthGuard }   from './auth';
import { BaseGuard }     from './auth';
import { AuthorGuard }   from './auth';
import { EditorGuard }   from './auth';
import { ShopMgrGuard }  from './auth';
import { AdminGuard }    from './auth';
import { SuperUserGuard} from './auth';

import { routing }       from './app.routes';
import { App }           from './app';

/* FIXME: If we do not put these globally used directives here, we will get
 * strange error: Can't bind to 'routerLink' since it isn't a known property of 'a'
 */
import { Sidebar } from './directives/sidebar';
import { Topbar }  from './directives/topbar';

import { MigrationPage }  from './migration';
import { ImagesPage }     from './gallery';
import { EmailHomePage }      from './email';
import { EmailTemplatesPage } from './email';
import { EmailTemplatePage }  from './email';
import { NewslettersPage }    from './email';
import { NewsletterPage }     from './email';

import { provideStore }  from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects/module';

/* Import the default export from these files */
import reducer            from './reducers';
import effects            from './effects';
import { AuthEffects }    from './effects';
import { UserEffects }    from './effects';
import { ProductEffects } from './effects';
import { OrderEffects }   from './effects';
import { PostEffects }    from './effects';

import { SharedModule }    from './directives/shared.module';
import { AuthModule }      from './auth/auth.module';
import { UserModule }      from './user/user.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CmsModule }       from './cms/cms.module';
import { ShopModule }      from './shop/shop.module';


import { StoreLogMonitorComponent } from '@ngrx/store-log-monitor';
import { instrumentStore } from '@ngrx/store-devtools';
import { useLogMonitor } from '@ngrx/store-log-monitor';

@NgModule({
    imports: [
        routing,
        BrowserModule,
        HttpModule,
        AuthModule,
        DashboardModule,
        CmsModule,
        ShopModule,
        UserModule,
        SharedModule.forRoot(),
        EffectsModule.run(AuthEffects),
        EffectsModule.run(UserEffects),
        EffectsModule.run(ProductEffects),
        EffectsModule.run(OrderEffects),
        EffectsModule.run(PostEffects),
    ],
    declarations: [
        /* Debug only */
        StoreLogMonitorComponent,
        
        App,

        Topbar,
        Sidebar,
        //Paginator,

        /* Migration */
        MigrationPage,

        /* Gallary */
        ImagesPage,

        /* Email */
        EmailHomePage,
        EmailTemplatesPage,
        EmailTemplatePage,
        NewslettersPage,
        NewsletterPage,
    ],
    providers: [
        Title,
        UnauthGuard,
        BaseGuard,
        AuthorGuard,
        EditorGuard,
        ShopMgrGuard,
        AdminGuard,
        SuperUserGuard,
        provideStore(reducer),

        /**
         * instrumentStore() sets up the @ngrx/store-devtools providers
         */
        instrumentStore({
            monitor: useLogMonitor({
                position: 'right',
                visible: true
            })
        }),
    ],
    bootstrap: [ App ]
})
export class AppModule {
}