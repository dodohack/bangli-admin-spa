import { RouterConfig } from '@angular/router';

import { AuthGuard }    from '../auth/guard';
import { PostsPage }    from './posts';
import { PostPage }     from './post';
import { TopicsPage }   from './topics';
import { TopicPage }    from './topic';
import { PagesPage }    from './pages';
import { PagePage }     from './page';

export const cmsRoutes: RouterConfig = [
    {
        /**
         * Posts path
         */
        path: 'post',
        canActivate: [AuthGuard],
        children: [

            /* List of posts */
            { path: '', pathMatch: 'full', redirectTo: 'list/all/all/1' },
            { path: 'list/:filter/:cond', redirectTo: 'list/:filter/:cond/1' },
            { path: 'list/:filter/:cond/:page', component: PostsPage },

            /* Single post */
            { path: 'new', component: PostPage },
            { path: ':id', component: PostPage }
        ]
    },

    {
        /**
         * Topics path
         */
        path: 'topic',
        canActivate: [AuthGuard],
        children: [

            /* List of topics */
            { path: '', pathMatch: 'full', redirectTo: 'list/all/all/1' },
            { path: 'list/:filter/:cond', redirectTo: 'list/:filter/:cond/1' },
            { path: 'list/:filter/:cond/:page', component: TopicsPage },

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
        canActivate: [AuthGuard],
        children: [

            /* List of pages */
            { path: '', pathMatch: 'full', redirectTo: 'list/all/all/1' },
            { path: 'list/:filter/:cond', redirectTo: 'list/:filter/:cond/1' },
            { path: 'list/:filter/:cond/:page', component: PagesPage },

            /* Single page */
            { path: 'new', component: PagePage },
            { path: ':id', component: PagePage }
        ]
    },
];