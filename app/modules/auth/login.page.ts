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
import { AuthActions }  from "../../actions";
import { AlertActions } from "../../actions";

@Component({
    template: `<login-form [auth]="auth$ | async"
                           (login)="onSubmit($event)"></login-form>`
})
export class LoginPage implements OnInit
{
    auth$: Observable<any>;

    constructor(private store: Store<AppState>,
                private router: Router) {
        this.auth$ = this.store.select('auth');
    }

    ngOnInit() {
        // Do not need to do this manually
        // Rehydrate user/auth from localStorage
        //this.store.dispatch(AuthActions.init());

        // FIXME: Is this a good way to get data from store?
        this.auth$.subscribe(payload => {
            if (!payload.token) this.onLoginFail();
            else this.onLoginSuccess();
        });
    }

    onSubmit($event) {
        console.log("login submit event: ", $event);
        this.store.dispatch(AuthActions.login($event));
    }
    
    private onLoginFail() {
        // WHAT TO DO??
    }
    
    private onLoginSuccess() {
        this.router.navigate(['/dashboard']);
    }

}
