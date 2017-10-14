/**
 * This login process uses ngrx/store, once this is working, old login will
 * be deprecated.
 */
import { Component }      from '@angular/core';
import { EventEmitter }   from '@angular/core';
import { Input, Output }  from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { AuthUser }       from '../../../models';

@Component({
    selector: 'register-form',
    templateUrl: './register-form.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterForm
{
    @Output() register = new EventEmitter();

    /* Just a form data */
    user: AuthUser;
}
