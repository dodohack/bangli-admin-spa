/**
 * This is the module contains all user authentication related pages
 */
import { NgModule }     from '@angular/core';
import { SharedModule } from '../directives/shared.module';

import { routing }      from './routing';

import { PostsEditGuard } from './guard';
import { PostEditGuard }  from './guard';

import { PostsList }    from './components/posts.list';
import { TopicsList }   from './components/topics.list';

import { PostsPage }    from './posts.page';
import { PostPage }     from './post.page';
import { TopicsPage }   from './topics.page';
import { TopicPage }    from './topic.page';
import { PagesPage }    from './pages.page';
import { PagePage }     from './page.page';


@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [
        PostsList, TopicsList,
        PostsPage, PostPage,
        TopicsPage, TopicPage, 
        PagesPage, PagePage 
    ],
    providers: [
        PostsEditGuard,
        PostEditGuard
    ]
})
export class CmsModule {}
