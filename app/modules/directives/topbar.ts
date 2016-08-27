import { Component }               from '@angular/core';
import { Input, Output }           from '@angular/core';
import { EventEmitter }            from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { AuthState }      from '../../reducers/auth';
import { Preference }     from '../../models';

@Component({
    selector: 'topbar',
    template: require('./topbar.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Topbar {
    @Input() auth: AuthState;
    @Input() pref: Preference;

    @Output() logout = new EventEmitter();
    @Output() loginDomain = new EventEmitter();
}
