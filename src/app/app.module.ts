import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { Title }         from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule }  from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

//import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { UnauthGuard }   from './guard';
import { BaseGuard }     from './guard';
import { AuthorGuard }   from './guard';
import { EditorGuard }   from './guard';
import { AdminGuard }    from './guard';
import { SuperUserGuard} from './guard';
import { LockGuard }     from './guard';
import { EditLockGuard } from './guard';

import { Helper }        from './helper';

import { routing }       from './app.routes';
import { App }           from './app';
import { Sidebar }       from './modules/directives/sidebar';
import { Topbar }        from './modules/directives/topbar';

/* Import the default export from these files */
import {reducers, metaReducers} from './reducers';
import { AuthEffects }     from './effects';
import { UserEffects }     from './effects';
import { EntityEffects }   from './effects';
import { CmsAttrEffects }  from './effects';
import { SysAttrEffects }  from './effects';
import { FeMenuEffects }   from './effects';
import { OfferFilterEffects } from './effects';

import { SharedModule }    from './modules/directives/shared.module';
import { AuthModule }      from './modules/auth/auth.module';
import { UserModule }      from './modules/user/user.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { BbsModule }       from './modules/bbs/bbs.module';
import { CmsModule }       from './modules/cms/cms.module';
import { AdsModule }       from './modules/ads/ads.module';
import { EmailModule }     from './modules/email/email.module';
import { CommentModule }   from './modules/comment/comment.module';
import { SocialModule }    from './modules/social/social.module';
import { AnalysisModule }  from './modules/analysis/analysis.module';
import { AttachmentModule }from './modules/attachment/attachment.module';
import { MigrationModule } from './modules/migration/migration.module';
import { SettingModule }   from './modules/setting/setting.module';

import { BsDropdownModule }             from 'ngx-bootstrap';
import { AccordionModule }              from 'ngx-bootstrap';
import { AccordionConfig }              from 'ngx-bootstrap';
import { AccordionComponent }           from 'ngx-bootstrap';
import { DatepickerModule }             from 'ngx-bootstrap';
import { TimepickerModule }             from 'ngx-bootstrap';
import { TabsetConfig }                 from 'ngx-bootstrap';

//import { MaterialModule }    from './material.module';



/* Debug tools */
/*
import { StoreLogMonitorModule } from '@ngrx/store-log-monitor';
import { useLogMonitor }         from '@ngrx/store-log-monitor';
import { StoreDevtoolsModule }   from '@ngrx/store-devtools';
*/

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
        UserModule,
        CommentModule,
        SocialModule,
        AnalysisModule,
        AttachmentModule,
        MigrationModule,
        SettingModule,

        BrowserAnimationsModule,

        SharedModule.forRoot(),

        BsDropdownModule.forRoot(),
        DatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        AccordionModule.forRoot(),

        StoreModule.forRoot(reducers, {metaReducers}),
        EffectsModule.forRoot([
            AuthEffects,
            UserEffects,
            EntityEffects,
            CmsAttrEffects,
            SysAttrEffects,
            FeMenuEffects,
            OfferFilterEffects
        ]),
        /*
        StoreDevtoolsModule.instrumentStore({
            monitor: useLogMonitor({
                visible: true,
                position: 'right'
            })
        }),
        StoreLogMonitorModule
        */
    ],
    declarations: [
        App,

        Topbar,
        Sidebar,
    ],
    providers: [
        Title,
        Helper,
        UnauthGuard,
        BaseGuard,
        AuthorGuard,
        EditorGuard,
        AdminGuard,
        SuperUserGuard,
        LockGuard,
        EditLockGuard,

        AccordionConfig,
        AccordionComponent,
        TabsetConfig,
    ],
    bootstrap: [ App ]
})
export class AppModule {
}
