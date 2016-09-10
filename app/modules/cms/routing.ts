import { Routes, RouterModule } from '@angular/router';

import { AuthorGuard, EditorGuard, LockGuard } from '../../guard';
import { PostsEditGuard, PostEditGuard }       from './guard';

import { SettingPage }    from './setting.page';
import { CategoriesPage } from './categories.page';
import { TagsPage }       from './tags.page';
import { ChannelsPage }   from './channels.page';

import { PostsPage }    from './posts.page';
import { PostPage }     from './post.page';
import { TopicsPage }   from './topics.page';
import { TopicPage }    from './topic.page';
import { PagesPage }    from './pages.page';
import { PagePage }     from './page.page';


const routes: Routes = [

    {
        /**
         * Cms setting path
         */
        path: 'cms',
        canActivate: [EditorGuard],
        children: [
            /* cms setting index */
            { path: '',  component: SettingPage },
            /* Categories settings */
            { path: 'category', component: CategoriesPage },
            /* Tags settings */
            { path: 'tag',      component: TagsPage },
            /* Channels settings */
            { path: 'channel',  component: ChannelsPage },
        ]
    },

    {
        /**
         * Posts path
         */
        path: 'post',
        children: [

            /* List of posts wo/ channels */
            { path: '', pathMatch: 'full', redirectTo: 'page/1/state/all' },
            { path: 'page/:page',          redirectTo: 'page/:page/state/all' },
            { path: 'page/:page/state/:state', component: PostsPage,
                canActivate: [AuthorGuard], canDeactivate: [PostsEditGuard]},
            
            /* List of posts w/ channels */
            { path: 'channel/:channel',            redirectTo: 'channel/:channel/page/1/state/all' },
            { path: 'channel/:channel/page/:page', redirectTo: 'channel/:channel/page/:page/state/all' },
            { path: 'channel/:channel/page/:page/state/:state', component: PostsPage,
                canActivate: [AuthorGuard], canDeactivate: [PostsEditGuard]},
            
            /* Single post */
            { path: 'new', component: PostPage,
                canActivate: [AuthorGuard], canDeactivate: [PostEditGuard] },
            { path: ':id', component: PostPage,
                canActivate: [AuthorGuard, LockGuard], canDeactivate: [PostEditGuard] }
        ]
    },

    {
        /**
         * Topics path
         */
        path: 'topic',
        canActivate: [EditorGuard],
        children: [

            /* List of topics wo/ channels */
            { path: '', pathMatch: 'full', redirectTo: 'page/1/state/all' },
            { path: 'page/:page',          redirectTo: 'page/:page/state/all' },
            { path: 'page/:page/state/:state', component: TopicsPage },

            /* List of topics w/ channels */
            { path: 'channel/:channel',            redirectTo: 'channel/:channel/page/1/state/all' },
            { path: 'channel/:channel/page/:page', redirectTo: 'channel/:channel/page/:page/state/all' },
            { path: 'channel/:channel/page/:page/state/:state', component: TopicsPage },


            /* Single topic */
            { path: 'new', component: TopicPage },
            { path: ':id', component: TopicPage }
        ]
    },

    {
        /**
         * Pages path
         */
        path: 'page',
        canActivate: [EditorGuard],
        children: [

            /* List of pages */
            { path: '', pathMatch: 'full', redirectTo: 'page/1/state/all' },
            { path: 'page/:page',          redirectTo: 'page/:page/state/all' },
            { path: 'page/:page/state/:state', component: PagesPage },

            /* Single page */
            { path: 'new', component: PagePage },
            { path: ':id', component: PagePage }
        ]
    },
];

export const routing = RouterModule.forChild(routes);
