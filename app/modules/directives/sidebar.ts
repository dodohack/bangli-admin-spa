import { Component }      from '@angular/core';
import { Input, Output }  from '@angular/core';
import { EventEmitter }   from '@angular/core';
import { Store }          from '@ngrx/store';
import { Observable }     from 'rxjs/Observable';
import { ChangeDetectionStrategy } from '@angular/core';

import { AppState }        from '../../reducers';
import { PreferenceState } from '../../reducers/preference';
import { SIDEBAR_MENUS }   from '../../models';
import { hasRole }         from '../../reducers';

@Component({
    selector: 'sidebar',
    template: require('./sidebar.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sidebar {

    @Input() curDomainKey: string;
    @Input() pref: PreferenceState;

    @Output() toggle = new EventEmitter();

    constructor(private store: Store<AppState>) {}

    hasRole$(name: string): Observable<boolean> {
        return this.store.let(hasRole(name));
    }

    get menus() { if (this.curDomainKey) return SIDEBAR_MENUS[this.curDomainKey]; }
}
