/**
 * Bangli domain only module, all sort of promotions
 */
import { NgModule }     from '@angular/core';
import { SharedModule } from '../directives/shared.module';

import { routing }      from './routing';

import { DealPostsPage }    from './posts.page';
import { DealPostPage }     from './post.page';
import { DealTopicsPage }   from './topics.page';
import { DealTopicPage }    from './topic.page';

@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [
        DealPostsPage,
        DealPostPage,
        DealTopicsPage,
        DealTopicPage
    ]
})
export class DealModule {}
