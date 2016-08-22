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
import { AuthService }   from './service';
import { UserService }   from './service';
import { routing }       from './app.routes';
import { App }           from './app';


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
import reducer           from './reducers';
import { AuthEffects }   from './effects';

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
        BrowserModule,
        routing,
        HttpModule,
        AuthModule,
        DashboardModule,
        CmsModule,
        ShopModule,
        UserModule,
        SharedModule.forRoot(),
        EffectsModule.run(AuthEffects),
    ],
    declarations: [
        /* Debug only */
        StoreLogMonitorComponent,
        
        App,
        Topbar,
        Sidebar,

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
        AuthService,
        UserService,
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