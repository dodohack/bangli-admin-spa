import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { Title }         from '@angular/platform-browser';

import { provideStore }  from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects/module';

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

/* Import the default export from these files */
import reducer            from './reducers';
import { AuthEffects }    from './effects';
import { UserEffects }    from './effects';
import { ProductEffects } from './effects';
import { OrderEffects }   from './effects';
import { VoucherEffects } from './effects';
import { NewsletterEffects } from './effects';
import { PostEffects }    from './effects';
import { TopicEffects }   from './effects';
import { PageEffects }    from './effects';

import { SharedModule }    from './directives/shared.module';
import { AuthModule }      from './auth/auth.module';
import { UserModule }      from './user/user.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CmsModule }       from './cms/cms.module';
import { EmailModule }     from './email/email.module';
import { ShopModule }      from './shop/shop.module';
import { AttachmentModule }from './attachment/attachment.module';
import { MigrationModule } from './migration/migration.module';

/* Debug tools */
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
        EmailModule,
        ShopModule,
        UserModule,
        AttachmentModule,
        MigrationModule,
        SharedModule.forRoot(),
        EffectsModule.run(AuthEffects),
        EffectsModule.run(UserEffects),
        EffectsModule.run(ProductEffects),
        EffectsModule.run(OrderEffects),
        EffectsModule.run(VoucherEffects),
        EffectsModule.run(NewsletterEffects),
        EffectsModule.run(PostEffects),
        EffectsModule.run(TopicEffects),
        EffectsModule.run(PageEffects),
    ],
    declarations: [
        /* Debug only */
        StoreLogMonitorComponent,
        
        App,

        Topbar,
        Sidebar,
        //Paginator,
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