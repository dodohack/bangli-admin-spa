/**
 * Display a table list of posts/topics/pages
 */
import { Component }     from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { EntityList }    from '../../base/entity.list';

@Component({
    selector: 'comment-list',
    template: require('./comment.list.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentList extends EntityList
{
}
