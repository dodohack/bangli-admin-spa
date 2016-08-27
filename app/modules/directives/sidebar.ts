import { Component }      from '@angular/core';
import { Input, Output }  from '@angular/core';
import { EventEmitter }   from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { AuthState }      from '../../reducers/auth';
import { Preference }     from '../../models';
import { SIDEBAR_MENUS }  from '../../models';

@Component({
    selector: 'sidebar',
    template: require('./sidebar.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sidebar {

    @Input() auth: AuthState;
    @Input() pref: Preference;

    @Output() toggle = new EventEmitter();

    get menus() { return SIDEBAR_MENUS[this.auth.key]; }

    //private hasRole(role: string) { return this.authService.hasRole(role); }
}