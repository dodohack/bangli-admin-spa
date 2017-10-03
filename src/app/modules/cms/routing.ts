/**
 * Routing for cms module
 */
import { Routes, RouterModule } from '@angular/router';

import { AuthorGuard, EditorGuard, LockGuard } from '../../guard';
import { PostsEditGuard, PostEditGuard }       from './guard';

import { PostsPage }    from './posts.page';
import { PostPage }     from './post.page';
import { TopicsPage }   from './topics.page';
import { TopicPage }    from './topic.page';
import { PagesPage }    from './pages.page';
import { PagePage }     from './page.page';
import { DealsPage }    from './deals.page';
import { DealPage }     from './deal.page';

const routes: Routes = [

    {
        /**
         * Posts path
         */
        path: 'post',
        children: [

            /**
             * NOTE: Redirecting url will trigger route.params/queryparams
             * emit twice, so we have to handle it properly, otherwise it is
             * easy to introduce bug!
             */
            /* List of posts wo/ channels */
            //{ path: '',                    component: PostsPage },
            //{ path: 'page/:page',          component: PostsPage },
            { path: '', pathMatch: 'full', redirectTo: 'page/1/state/all' },
            { path: 'page/:page',          redirectTo: 'page/:page/state/all' },
            { path: 'page/:page/state/:state', component: PostsPage, canActivate: [AuthorGuard]},
            
            /* List of posts w/ channels */
            { path: 'channel/:channel',            redirectTo: 'channel/:channel/page/1/state/all' },
            { path: 'channel/:channel/page/:page', redirectTo: 'channel/:channel/page/:page/state/all' },
            { path: 'channel/:channel/page/:page/state/:state', component: PostsPage,  canActivate: [AuthorGuard]},
            
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

    {
        // Deal post
        path: 'deal',
        canActivate: [EditorGuard],
        children: [
            // List of deal posts wo/ channels
            {path: '', pathMatch: 'full', redirectTo: 'page/1/state/all'},
            {path: 'page/:page',  redirectTo: 'page/:page/state/all'},
            {path: 'page/:page/state/:state', component: DealsPage},

            // List of deal posts w/ channels
            { path: 'channel/:channel',
                redirectTo: 'channel/:channel/page/1/state/all' },
            { path: 'channel/:channel/page/:page',
                redirectTo: 'channel/:channel/page/:page/state/all' },
            { path: 'channel/:channel/page/:page/state/:state',
                component: DealsPage},

            // Single deal post
            { path: 'new', component: DealPage },
            { path: ':id', component: DealPage}
        ]
    }
];

export const routing = RouterModule.forChild(routes);