import { Component }      from '@angular/core';
import { Input, Output }  from '@angular/core';
import { EventEmitter }   from '@angular/core';
import { Store }          from '@ngrx/store';
import { Observable }     from 'rxjs/Observable';
import { ChangeDetectionStrategy } from '@angular/core';

import { AppState }        from '../../reducers';
import { PreferenceState } from '../../reducers/preference';
import { SIDEBAR_MENUS }   from '../../models';
//import { hasRole }         from '../../reducers';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sidebar {

    @Input() curDomainKey: string;
    @Input() isLoggedInDomain: boolean;
    @Input() pref: PreferenceState;

    @Output() toggle = new EventEmitter();

    constructor(private store: Store<AppState>) {}

    hasRole$(name: string): Observable<boolean> {
        // FIXME
        return Observable.of(true);
        //return this.store.let(hasRole(name));
    }

    get menus() { return SIDEBAR_MENUS; }
}
