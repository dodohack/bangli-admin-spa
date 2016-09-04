import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { Title }         from '@angular/platform-browser';

import { provideStore }  from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects/module';

import { UnauthGuard }   from './guard';
import { BaseGuard }     from './guard';
import { AuthorGuard }   from './guard';
import { EditorGuard }   from './guard';
import { ShopMgrGuard }  from './guard';
import { AdminGuard }    from './guard';
import { SuperUserGuard} from './guard';
import { LockGuard }     from './guard';
import { EditLockGuard } from './guard';

import { Ping }          from './ping';
import { routing }       from './app.routes';
import { App }           from './app';
import { Sidebar }       from './modules/directives/sidebar';
import { Topbar }        from './modules/directives/topbar';

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
import { CmsAttrEffects } from './effects';

import { SharedModule }    from './modules/directives/shared.module';
import { AuthModule }      from './modules/auth/auth.module';
import { UserModule }      from './modules/user/user.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { CmsModule }       from './modules/cms/cms.module';
import { DealModule }      from './modules/deal/deal.module';
import { EmailModule }     from './modules/email/email.module';
import { ShopModule }      from './modules/shop/shop.module';
import { AffiliateModule } from './modules/affiliate/affiliate.module';
import { AnalysisModule }  from './modules/analysis/analysis.module';
import { AttachmentModule }from './modules/attachment/attachment.module';
import { MigrationModule } from './modules/migration/migration.module';

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
        DealModule,
        EmailModule,
        ShopModule,
        UserModule,
        AffiliateModule,
        AnalysisModule,
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
        EffectsModule.run(CmsAttrEffects),
    ],
    declarations: [
        /* Debug only */
        StoreLogMonitorComponent,
        
        App,

        Topbar,
        Sidebar,
    ],
    providers: [
        Title,
        Ping,
        UnauthGuard,
        BaseGuard,
        AuthorGuard,
        EditorGuard,
        ShopMgrGuard,
        AdminGuard,
        SuperUserGuard,
        LockGuard,
        EditLockGuard,
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