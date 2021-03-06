/**
 * This is the register page for backend
 */

import { Component }         from '@angular/core';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs';

import { AppState }          from '../../reducers';
import * as AuthActions      from '../../actions/auth';
import * as AlertActions     from '../../actions/alert';

@Component({
    template: `<register-form (register)="onSubmit($event)"></register-form>`
})
export class RegisterPage 
{
    auth$: Observable<any>;
    
    constructor(private store: Store<AppState>) {
        this.auth$ = store.select('auth');
    }

    onSubmit($event)
    {
        if ($event.password != $event.password_confirmation) {
            this.store.dispatch(new AlertActions.Error('两次输入的密码不匹配'));
            return;
        }

        this.store.dispatch(new AuthActions.Register($event));
        
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