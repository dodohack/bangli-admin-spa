/**
 * Bangli domain only module, all sort of promotions
 */
import { NgModule }     from '@angular/core';
import { SharedModule } from '../directives/shared.module';

import { routing }      from './routing';

import { DealList }         from './components/deal.list';
import { DealPostsPage }    from './deal.posts.page';
import { DealPostPage }     from './deal.post.page';

@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [
        DealList,
        DealPostsPage,
        DealPostPage,
    ]
})
export class DealModule {}
