import { Component }      from '@angular/core';
import { Input, Output }  from '@angular/core';
import { EventEmitter }   from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';


import { PreferenceState } from '../../reducers/preference';
import { SIDEBAR_MENUS }   from '../../models';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sidebar {

    @Input() curDomainKey: string;
    @Input() isLoggedInDomain: boolean;
    // This is a workaround to fix angular-cli bug:
    // https://github.com/angular/angular-cli/issues/2034
    @Input() pref = null as PreferenceState;

    @Output() toggle = new EventEmitter();

    get menus() { return SIDEBAR_MENUS; }
}
