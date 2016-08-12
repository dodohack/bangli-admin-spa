import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { Title }         from '@angular/platform-browser';

import { AuthGuard }     from './auth';
import { AuthService }   from './service';
import { UserService }   from './service';
import { DomainService } from './service';
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
import { OrderPage }      from './shop';

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
        OrderPage,

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
        AuthGuard, 
        AuthService, 
        UserService, 
        DomainService 
    ],
    bootstrap: [ App ]
})
export class AppModule {
}