/**
 * Display a table list of users
 */
import { Component }     from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { EntityList } from '../../base/entity.list';

@Component({
    selector: 'user-list',
    templateUrl: './user.list.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserList extends EntityList
{
}
