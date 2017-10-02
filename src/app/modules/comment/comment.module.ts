/**
 * This is the module contains all the system level settings, manageable only
 * by administrator.
 */
import { NgModule } from '@angular/core';
import { SharedModule } from '../directives/shared.module';

import { routing }         from './routing';

import { CommentList }     from './components/comment.list';
import { CommentsPage }    from './comments.page';

@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [
        CommentList,
        CommentsPage,
    ]
})
export class CommentModule {}
