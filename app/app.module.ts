import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { Title }         from '@angular/platform-browser';

import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap';
import { AlertComponent }       from 'ng2-bootstrap';
import { TYPEAHEAD_DIRECTIVES } from 'ng2-bootstrap';
import { TAB_DIRECTIVES }       from 'ng2-bootstrap';

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

import { UserPreference } from './preference';

import { CategoryTreeComponent }     from './components';
import { EditorPageHeaderComponent } from './components';
import { ListPageHeaderComponent }   from './components';
import { FastEditPostFormComponent } from './components';
import { PaginatorComponent }        from './components';
import { PostCttCloudComponent}      from './components';
import { SearchBoxComponent }        from './components';
import { SidebarComponent }          from './components';
import { TopbarComponent}            from './components';
import { TagCloudComponent }         from './components';
import { DateFilterComponent }       from './components';

import { LoginPage }      from './auth';
import { RegisterPage }   from './auth';
import { LogoutComponent} from './auth';
import {LostPasswordPage} from './auth';
import {ResetPasswordPage}from './auth';

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

/* FIXME: Remove this static class */
/* Called before bootstrap */
UserPreference.init();

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        HttpModule
    ],
    declarations: [
        ACCORDION_DIRECTIVES,
        TYPEAHEAD_DIRECTIVES,
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
        SidebarComponent,
        TopbarComponent,
        TagCloudComponent,
        DateFilterComponent,
        
        /* AUTH */
        LoginPage,
        RegisterPage,
        LostPasswordPage,
        ResetPasswordPage,
        LogoutComponent,

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
        Title, 
        BaseGuard,
        AuthorGuard,
        EditorGuard,
        ShopMgrGuard,
        AdminGuard,
        SuperUserGuard,
        AuthService, 
        UserService
    ],
    bootstrap: [ App ]
})
export class AppModule {
}