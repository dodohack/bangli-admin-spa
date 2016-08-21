/**
 * This login process uses ngrx/store, once this is working, old login will
 * be deprecated.
 */
import { Component }      from '@angular/core';
import { EventEmitter }   from '@angular/core';
import { Input, Output }  from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { User }           from '../../models';

@Component({
    selector: 'login-form',
    template: require('./login-form.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginForm
{
    _auth: User;
    @Input() set auth(value) { this._auth = Object.assign({}, value); }
    get auth() { return this._auth; }

    /* NOTE: keyword 'submit' is reserved, if using it, 2 event is emitted */
    @Output()
    login = new EventEmitter();
}
