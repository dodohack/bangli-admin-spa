/**
 * Display a table list of users
 */
import { Component }     from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { UsersState } from '../../reducers/users';
import { User } from '../../models';

@Component({
    selector: 'users-list',
    template: require('./users.list.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersList
{
    _usersState: UsersState;
    @Input() set usersState(value) { this._usersState = Object.assign({}, value); }
    get usersState() { return this._usersState; }
    
    get uuids() { return this._usersState.uuids; }
    get users() { return this._usersState.entities; }
    get paginator() { return this._usersState.paginator; }
}

