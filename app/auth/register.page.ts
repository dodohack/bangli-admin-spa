/**
 * This is the register page for backend
 */

import { Component }         from '@angular/core';
import { OnInit }            from '@angular/core';
import { Router }            from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs';

import { AppState }          from '../reducers';
import { AuthActions }       from '../actions';
import { AlertActions }      from '../actions';

@Component({
    template: `<register-form [auth]="auth$ | async" 
                              (submit)="onSubmit($event)"></register-form>`
})
export class RegisterPage 
{
    auth$: Observable<any>;
    
    constructor(private store: Store<AppState>,
                private router: Router) {
        this.auth$ = store.select('auth');
    }

    onSubmit($event)
    {
        if ($event.password != $event.password_confirmation) {
            this.store.dispatch(AlertActions.error('两次输入的密码不匹配'));
            return;
        }
        
        this.store.dispatch(AuthActions.register($event));
        
        /* Reset the error message */
        /*
        this.error.reset();

        this.authService.postRegister(this.form.stringify()).subscribe(
                data  => {
                    this.authService.login(data);
                },
                error => {
                    error['name'] ? this.error['name'] = error['name'] : false;
                    error['email'] ? this.error['email'] = error['email'] : false;
                    error['password'] ? this.error['password'] = error['password'] : false;
                    //console.error(error);
                }
            );
       */
    }
}