/**
 * This is the module contains all user authentication related pages
 */
import { NgModule }     from '@angular/core';
import { SharedModule } from '../directives/shared.module';

import { routing }      from './routing';

import { PostsList }    from './components/posts.list';

import { PostsPage }    from './posts.page';
import { PostPage }     from './post.page';
import { TopicsPage }   from './topics.page';
import { TopicPage }    from './topic.page';
import { PagesPage }    from './pages.page';
import { PagePage }     from './page.page';


@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [
        PostsList,
        PostsPage, PostPage,
        TopicsPage, TopicPage, 
        PagesPage, PagePage 
    ]
})
export class CmsModule {}
