/**
 * This login process uses ngrx/store, once this is working, old login will
 * be deprecated.
 */
import { Component }  from '@angular/core';
import { OnInit }     from '@angular/core';
import { Router }     from '@angular/router';
import { Store }      from '@ngrx/store';
import { Observable } from "rxjs";

import { AppState }     from '../../reducers';
import { AuthState }    from '../../reducers/auth';
import { AuthActions }  from '../../actions';
import { AlertActions } from '../../actions';

@Component({
    template: `<login-form (login)="onSubmit($event)"></login-form>`
})
export class LoginPage implements OnInit
{
    constructor(private store: Store<AppState>,
                private router: Router) {}

    ngOnInit() {
        // Do not need to do this manually
        // Rehydrate user/auth from localStorage
        //this.store.dispatch(AuthActions.init());

        // FIXME: Is this a good way to get data from store?
        this.store.select<AuthState>('auth').subscribe(auth => {
            if (auth.token && auth.key) {
                this.router.navigate(['/dashboard']);
            }
        });
    }

    onSubmit($event) {
        console.log("login submit event: ", $event);
        this.store.dispatch(AuthActions.login($event));
    }
}
