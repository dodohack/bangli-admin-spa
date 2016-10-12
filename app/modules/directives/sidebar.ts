import { Component }      from '@angular/core';
import { Input, Output }  from '@angular/core';
import { EventEmitter }   from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { PreferenceState } from '../../reducers/preference';
import { SIDEBAR_MENUS }   from '../../models';

@Component({
    selector: 'sidebar',
    template: require('./sidebar.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sidebar {

    @Input() curDomainKey: string;
    @Input() pref: PreferenceState;

    @Output() toggle = new EventEmitter();

    get menus() { if (this.curDomainKey) return SIDEBAR_MENUS[this.curDomainKey]; }

    //private hasRole(role: string) { return this.authService.hasRole(role); }
}
