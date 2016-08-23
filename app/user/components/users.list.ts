/**
 * Display a table list of users
 */
import { Component }     from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { User } from '../../models';

@Component({
    selector: 'users-list',
    template: require('./users.list.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersList
{
    _users: User[];
    @Input() set users(value) { this._users = Object.assign({}, value); }
    get users() { return this._users; }
}

