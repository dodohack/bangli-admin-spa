import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { Title }         from '@angular/platform-browser';

import { provideStore }  from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UnauthGuard }   from './guard';
import { BaseGuard }     from './guard';
import { AuthorGuard }   from './guard';
import { EditorGuard }   from './guard';
import { ShopMgrGuard }  from './guard';
import { AdminGuard }    from './guard';
import { SuperUserGuard} from './guard';
import { LockGuard }     from './guard';
import { EditLockGuard } from './guard';

import { routing }       from './app.routes';
import { App }           from './app';
import { Sidebar }       from './modules/directives/sidebar';
import { Topbar }        from './modules/directives/topbar';

/* Import the default export from these files */
import reducer             from './reducers';
import { AuthEffects }     from './effects';
import { UserEffects }     from './effects';
import { EntityEffects }   from './effects';
import { CmsAttrEffects }  from './effects';
import { ShopAttrEffects } from './effects';
import { SysAttrEffects }  from './effects';

import { SharedModule }    from './modules/directives/shared.module';
import { AuthModule }      from './modules/auth/auth.module';
import { UserModule }      from './modules/user/user.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { BbsModule }       from './modules/bbs/bbs.module';
import { CmsModule }       from './modules/cms/cms.module';
import { AdsModule }       from './modules/ads/ads.module';
import { EmailModule }     from './modules/email/email.module';
import { ShopModule }      from './modules/shop/shop.module';
import { CommentModule }   from './modules/comment/comment.module';
import { CsModule }        from './modules/cs/cs.module';
import { SocialModule }    from './modules/social/social.module';
import { AffiliateModule } from './modules/affiliate/affiliate.module';
import { AnalysisModule }  from './modules/analysis/analysis.module';
import { AttachmentModule }from './modules/attachment/attachment.module';
import { MigrationModule } from './modules/migration/migration.module';
import { SettingModule }   from './modules/setting/setting.module';

/* Debug tools */
import { StoreLogMonitorModule } from '@ngrx/store-log-monitor';
import { useLogMonitor }         from '@ngrx/store-log-monitor';
import { StoreDevtoolsModule }   from '@ngrx/store-devtools';

@NgModule({
    imports: [
        routing,
        BrowserModule,
        HttpModule,
        //Ng2BootstrapModule,
        AuthModule,
        DashboardModule,
        BbsModule,
        CmsModule,
        AdsModule,
        EmailModule,
        ShopModule,
        CsModule,
        UserModule,
        CommentModule,
        SocialModule,
        AffiliateModule,
        AnalysisModule,
        AttachmentModule,
        MigrationModule,
        SettingModule,
        SharedModule.forRoot(),
        EffectsModule.run(AuthEffects),
        EffectsModule.run(UserEffects),
        EffectsModule.run(EntityEffects),
        EffectsModule.run(CmsAttrEffects),
        EffectsModule.run(ShopAttrEffects),
        EffectsModule.run(SysAttrEffects),
        StoreDevtoolsModule.instrumentStore({
            monitor: useLogMonitor({
                visible: true,
                position: 'right'
            })
        }),
        StoreLogMonitorModule
    ],
    declarations: [
        App,

        Topbar,
        Sidebar,
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
        LockGuard,
        EditLockGuard,
        provideStore(reducer),
    ],
    bootstrap: [ App ]
})
export class AppModule {
}
