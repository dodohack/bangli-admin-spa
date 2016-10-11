/**
 * Display a table list of users
 */
import { Component }     from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { EntityList } from '../../base/entity.list';

@Component({
    selector: 'user-list',
    template: require('./user.list.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserList extends EntityList
{
    get uuids() { return this.idsCurPage; }
    get users() { return this.entities; }
}
