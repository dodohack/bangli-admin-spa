/**
 * This is the module contains all user authentication related pages
 */
import { NgModule }     from '@angular/core';
import { SharedModule } from '../directives/shared.module';
import { AttachmentModule } from '../attachment/attachment.module';

import { routing }      from './routing';

import { PostsEditGuard } from './guard';
import { PostEditGuard }  from './guard';

import { CmsList }      from './components/cms.list';
import { PostsPage }    from './posts.page';
import { PostPage }     from './post.page';
import { TopicsPage }   from './topics.page';
import { TopicPage }    from './topic.page';
import { PagesPage }    from './pages.page';
import { PagePage }     from './page.page';
import { OffersPage }   from './offers.page';
import { OfferPage }    from './offer.page';


@NgModule({
    imports: [ SharedModule, AttachmentModule, routing ],
    declarations: [
        CmsList,
        PostsPage, PostPage,
        TopicsPage, TopicPage, 
        PagesPage, PagePage,
        OffersPage, OfferPage
    ],
    providers: [
        PostsEditGuard,
        PostEditGuard
    ]
})
export class CmsModule {}
