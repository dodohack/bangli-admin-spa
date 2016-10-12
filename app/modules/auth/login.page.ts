/**
 * This login process uses ngrx/store, once this is working, old login will
 * be deprecated.
 */
import { Component }  from '@angular/core';
import { OnInit }     from '@angular/core';
import { Store }      from '@ngrx/store';
import { Observable } from "rxjs/Observable";

import { AppState }     from '../../reducers';
import { AuthState }    from '../../reducers/auth';
import { AuthActions }  from '../../actions';
import { AlertActions } from '../../actions';

import { isDashboardUser } from '../../reducers';

@Component({
    template: `<login-form [isLoggedIn]="isDashboardUser$ | async" 
(login)="onSubmit($event)"></login-form>`
})
export class LoginPage implements OnInit
{
    isDashboardUser$: Observable<boolean>;

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.isDashboardUser$ = this.store.let(isDashboardUser());
    }

    onSubmit($event) {
        this.store.dispatch(AuthActions.login($event));
    }
}
