import { Routes, RouterModule } from '@angular/router';

import { AuthorGuard, EditorGuard, LockGuard } from '../../guard';
import { PostsEditGuard, PostEditGuard }       from './guard';

import { PostsPage }    from './posts.page';
import { PostPage }     from './post.page';
import { TopicsPage }   from './topics.page';
import { TopicPage }    from './topic.page';
import { PagesPage }    from './pages.page';
import { PagePage }     from './page.page';


const routes: Routes = [
    {
        /**
         * Posts path
         */
        path: 'post',
        children: [

            /* List of posts */
            { path: '', pathMatch: 'full', redirectTo: 'page/1/state/all' },
            { path: 'page/:page',          redirectTo: 'page/:page/state/all' },
            { path: 'page/:page/state/:state', component: PostsPage,
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

            /* List of topics */
            /* List of posts */
            { path: '', pathMatch: 'full', redirectTo: 'page/1/state/all' },
            { path: 'page/:page',          redirectTo: 'page/:page/state/all' },
            { path: 'page/:page/state/:state', component: TopicsPage },

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
            { path: '', pathMatch: 'full', redirectTo: 'list/all/all/1' },
            { path: 'list',                redirectTo: 'list/all/all/1' },
            { path: 'list/status',         redirectTo: 'list/all/all/1' },
            { path: 'list/:filter/:cond',  redirectTo: 'list/:filter/:cond/1' },
            { path: 'list/:filter/:cond/:page', component: PagesPage },

            /* Single page */
            { path: 'new', component: PagePage },
            { path: ':id', component: PagePage }
        ]
    },
];

export const routing = RouterModule.forChild(routes);
