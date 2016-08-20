/**
 * This login process uses ngrx/store, once this is working, old login will
 * be deprecated.
 */
import { Component }  from '@angular/core';
import { OnInit }     from '@angular/core';
import { Router }     from '@angular/router';
import { Store }      from '@ngrx/store';
import { Observable } from "rxjs/Rx";

import { AppState }    from '../reducers';
import { AuthService } from '../service';
import { User }        from '../models';
import { AuthActions } from "../actions";
import { AlertActions } from "../actions";


let t = require('./login.html');
@Component({
    template: t
})
export class LoginPage implements OnInit
{
    user: User = new User;
    
    auth$: Observable<any>;

    constructor(private store: Store<AppState>,
                private router: Router) {
        this.auth$ = store.select('auth');
    }

    ngOnInit() {
        // TODO: Implement this when we manage to save data to localStorage
        // Rehydrate user/auth from localStorage
        this.store.dispatch({ type: AuthActions.INIT });

        // FIXME: Is this a good way to get data from store?
        this.auth$.subscribe(payload => {
           console.log("ngOnInit: ", payload);
            if (!payload.loginSuccess)
                this.onLoginFail();
            else
                this.onLoginSuccess();
        });
    }

    onSubmit() {
        this.store.dispatch({type: AuthActions.LOGIN, payload: this.user});
    }
    
    private onLoginFail() {
        this.resetUser();
    }
    
    private onLoginSuccess() {
        this.router.navigate(['/dashboard']);
    }

    // FIXME: Reset the form will reset the payload passed to LOGIN action
    private resetUser() {
        // Reset
        /*
        this.user.email = '';
        this.user.password = '';
        */
    }
}
