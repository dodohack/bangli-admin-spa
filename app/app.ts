/**
 * This is the entry point of admin.huluwa.uk
 */

import { Component }         from '@angular/core';
import { Router }            from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

//import { AuthService }       from './services';
import { UserPreference }    from './preference';
import { AppState }          from './reducers';
import { Alert }             from './models';

let t = require('./app.html');
@Component({
    selector: 'admin-spa',
    template: t
})
export class App
{
    /* FIXME: Observable is already an array !!! */
    //alerts: Observable<Alert>;
    alerts = Array<Object>();
    
    constructor(/*private authService: AuthService,*/
                private store: Store<AppState>,
                private router: Router) {
        //this.alerts = store.select('alerts');
        //this.alerts.subscribe(payload => console.log('ALERT: ', payload));
        store.select('alerts').subscribe(alert => this.alerts.push(alert));
        //console.log("This alerts: ", this.alerts);
    }

    get isLoggedIn() { return false; /*return this.authService.isLoggedIn;*/ }
    get toggleSidebar() { return UserPreference.toggleSidebar(); }
}
