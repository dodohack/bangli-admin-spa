/**
 * This is the module contains all user authentication related pages
 */
import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../directives/shared.module';

import { routing }      from './routing';

import { PostService }  from '../service';

import { PostsPage }    from './posts.page';
import { PostPage }     from './post.page';
import { TopicsPage }   from './topics.page';
import { TopicPage }    from './topic.page';
import { PagesPage }    from './pages.page';
import { PagePage }     from './page.page';


@NgModule({
    imports: [ CommonModule, SharedModule, routing ],
    declarations: [
        PostsPage, PostPage,
        TopicsPage, TopicPage, 
        PagesPage, PagePage 
    ],
    providers: [
        PostService
    ]
})
export class CmsModule {}
