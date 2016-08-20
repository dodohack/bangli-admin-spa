import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { Title }         from '@angular/platform-browser';

import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap';
import { AlertComponent }       from 'ng2-bootstrap';
import { TYPEAHEAD_DIRECTIVES } from 'ng2-bootstrap';
import { TAB_DIRECTIVES }       from 'ng2-bootstrap';
import { DROPDOWN_DIRECTIVES }  from 'ng2-bootstrap';

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

import { NewAuthService }   from './services';

import { Topbar }         from './directives';
import { Sidebar }        from './directives';

import { CategoryTreeComponent }     from './components';
import { EditorPageHeaderComponent } from './components';
import { ListPageHeaderComponent }   from './components';
import { FastEditPostFormComponent } from './components';
import { PaginatorComponent }        from './components';
import { PostCttCloudComponent}      from './components';
import { SearchBoxComponent }        from './components';
import { TagCloudComponent }         from './components';
import { DateFilterComponent }       from './components';

import { DashboardPage }  from './dashboard';

import { MigrationPage }  from './migration';

import { PostsPage }      from './cms';
import { PostPage }       from './cms';
import { TopicsPage }     from './cms';
import { TopicPage }      from './cms';
import { PagesPage }      from './cms';
import { PagePage }       from './cms';

import { ImagesPage }     from './gallery';

import { ProductsPage }   from './shop';
import { ProductPage }    from './shop';
import { OrdersPage }     from './shop';

import { UsersPage }      from './user';
import { UserPage }       from './user';

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
import { AuthModule }    from './auth/auth.module';

import { StoreLogMonitorComponent } from '@ngrx/store-log-monitor';
import { instrumentStore } from '@ngrx/store-devtools';
import { useLogMonitor } from '@ngrx/store-log-monitor';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        HttpModule,
        AuthModule,
        EffectsModule.run(AuthEffects),
    ],
    declarations: [
        /* Debug only */
        StoreLogMonitorComponent,

        ACCORDION_DIRECTIVES,
        TYPEAHEAD_DIRECTIVES,
        DROPDOWN_DIRECTIVES,
        TAB_DIRECTIVES,
        AlertComponent,
        
        App,
        /* Components */
        CategoryTreeComponent,
        EditorPageHeaderComponent,
        ListPageHeaderComponent,
        FastEditPostFormComponent,
        PaginatorComponent,
        PostCttCloudComponent,
        SearchBoxComponent,
        Sidebar,
        Topbar,
        TagCloudComponent,
        DateFilterComponent,

        /* CMS */
        PostsPage,
        PostPage,
        TopicsPage,
        TopicPage,
        PagesPage,
        PagePage,

        /* Dashboard */
        DashboardPage,
        
        /* Migration */
        MigrationPage,

        /* Gallary */
        ImagesPage,

        /* Shop */
        ProductsPage,
        ProductPage,
        OrdersPage,

        /* Email */
        EmailHomePage,
        EmailTemplatesPage,
        EmailTemplatePage,
        NewslettersPage,
        NewsletterPage,

        /* User */
        UsersPage,
        UserPage,
    ],
    providers: [
        //NewAuthService,
        AuthService,
        UserService,
        Title,
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