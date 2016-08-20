import { Component }      from '@angular/core';
import { Input, Output }  from '@angular/core';
import { EventEmitter }   from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { User }           from '../models';
import { Preference }     from '../models';
import { SIDEBAR_MENUS }  from '../models';

@Component({
    selector: 'sidebar',
    template: require('./sidebar.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sidebar {

    @Input() auth: User;
    @Input() pref: Preference;

    @Output() toggle = new EventEmitter();

    get menus() { return SIDEBAR_MENUS[this.auth.domain_key]; }

    //private hasRole(role: string) { return this.authService.hasRole(role); }
}