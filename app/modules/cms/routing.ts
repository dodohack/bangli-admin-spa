import { Routes, RouterModule } from '@angular/router';

import { AuthorGuard, EditorGuard, LockGuard } from '../../guard';
import { PostsEditGuard, PostEditGuard }       from './guard';

import { CmsSetting }      from './settings/cms.setting.ts';
import { CategorySetting } from './settings/category.setting.ts';
import { TagSetting }      from './settings/tag.setting.ts';
import { TopicSetting }    from './settings/topic.setting.ts';
import { ChannelSetting }  from './settings/channel.setting.ts';

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
            { path: '',                   component: CmsSetting },
            { path: ':taxonomy',          redirectTo: ':taxonomy/shopping'},
            { path: ':taxonomy/:channel', component: CmsSetting },
            /*
            // Category settings
            { path: 'category',           redirectTo: 'category/shopping' },
            { path: 'category/:channel',  component: CategorySetting },
            // Tag settings
            { path: 'tag',                redirectTo: 'tag/shopping' },
            { path: 'tag/:channel',       component: TagSetting },
            // Topic settings
            { path: 'topic',              redirectTo: 'topic/shopping' },
            { path: 'topic/:channel',     component: TopicSetting },
            // Channel setting view only 
            { path: 'channel',            component: ChannelSetting },
            */
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
