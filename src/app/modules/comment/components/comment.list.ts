/**
 * Display a table list of comments
 */
import { Component }     from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { EntityList }    from '../../base/entity.list';
import {Helper} from "../../../helper";

@Component({
    selector: 'comment-list',
    templateUrl: './comment.list.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentList extends EntityList
{
    public constructor(helper: Helper) {
        super(helper);
    }
}
