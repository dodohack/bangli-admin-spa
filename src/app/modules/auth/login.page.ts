/**
 * This login process uses ngrx/store, once this is working, old login will
 * be deprecated.
 */
import { Component }  from '@angular/core';
import { OnInit }     from '@angular/core';
import { Router }     from '@angular/router';
import { Store }      from '@ngrx/store';
import { Observable } from "rxjs/Observable";

import { AppState }     from '../../reducers';
import { AuthState }    from '../../reducers/auth';
import * as AuthActions from '../../actions/auth';
import * as AlertActions from '../../actions/alert';

import { isDashboardUser } from '../../reducers';

@Component({
    template: `<login-form [isLoggedIn]="isDashboardUser$ | async" 
(login)="onSubmit($event)"></login-form>`
})
export class LoginPage implements OnInit
{
    isDashboardUser$: Observable<boolean>;

    constructor(private store: Store<AppState>,
                private router: Router) {}

    ngOnInit() {
        this.isDashboardUser$ = this.store.select(isDashboardUser);

        this.isDashboardUser$.filter(isDu => isDu)
            .subscribe(isDu => this.router.navigate(['/dashboard']));
    }

    onSubmit($event) {
        this.store.dispatch(new AuthActions.Login($event));
    }
}
