/**
 * Routing for deal module
 */
import { Routes, RouterModule } from '@angular/router';

import { EditorGuard }    from '../../guard';
import { DealPostEditGuard } from './guard';
import { DealTopicEditGuard } from './guard';

import { DealPostsPage }    from './posts.page';
import { DealPostPage }     from './post.page';
import { DealTopicsPage }   from './topics.page';
import { DealTopicPage }    from './topic.page';

export const routes: Routes = [
    {
        path: 'deal',
        canActivate: [EditorGuard],
        children: [
            // Direct to list of deal post by default
            {path: '', pathMatch: 'full', redirectTo: 'post'},

            {
                // Deal post
                path: 'post',
                children: [
                    // List of deal posts wo/ channels
                    {path: '', pathMatch: 'full', redirectTo: 'page/1/state/all'},
                    {path: 'page/:page',  redirectTo: 'page/:page/state/all'},
                    {path: 'page/:page/state/:state', component: DealPostsPage},

                    // List of deal posts w/ channels
                    { path: 'channel/:channel',
                      redirectTo: 'channel/:channel/page/1/state/all' },
                    { path: 'channel/:channel/page/:page',
                      redirectTo: 'channel/:channel/page/:page/state/all' },
                    { path: 'channel/:channel/page/:page/state/:state',
                      component: DealPostsPage},

                    // Single deal post
                    { path: 'new', component: DealPostPage,
                      canDeactivate: [DealPostEditGuard] },

                    { path: ':id', component: DealPostPage,
                        canDeactivate: [DealPostEditGuard] }
                ]
            },

            {
                // Deal topic
                path: 'topic',
                canActivate: [EditorGuard],
                children: [

                    /* List of deal topics wo/ channels */
                    { path: '', pathMatch: 'full', redirectTo: 'page/1/state/all' },
                    { path: 'page/:page',          redirectTo: 'page/:page/state/all' },
                    { path: 'page/:page/state/:state', component: DealTopicsPage },

                    /* List of deal topics w/ channels */
                    { path: 'channel/:channel',
                      redirectTo: 'channel/:channel/page/1/state/all' },
                    { path: 'channel/:channel/page/:page',
                      redirectTo: 'channel/:channel/page/:page/state/all' },
                    { path: 'channel/:channel/page/:page/state/:state',
                      component: DealTopicsPage },


                    /* Single deal topic */
                    { path: 'new', component: DealTopicPage, 
                      canDeactivate: [DealTopicEditGuard] },
                    { path: ':id', component: DealTopicPage, 
                      canDeactivate: [DealTopicEditGuard] }
                ]
            }
        ]
    }
];

export const routing = RouterModule.forChild(routes);
