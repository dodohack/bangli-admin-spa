/**
 * This login process uses ngrx/store, once this is working, old login will
 * be deprecated.
 */
import { Component }      from '@angular/core';
import { EventEmitter }   from '@angular/core';
import { Input, Output }  from '@angular/core';

import { User }           from '../../models';

@Component({
    selector: 'register-form',
    template: require('./register-form.html')
})
export class RegisterForm
{
    _auth: User;
    @Input() set auth(value) { this._auth = Object.assign({}, value); }
    get auth() { return this._auth; }

    @Output()
    register = new EventEmitter();
}
