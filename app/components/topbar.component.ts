import { Component }               from '@angular/core';
import { OnInit }                  from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Router }                  from '@angular/router';
import { Store }                   from '@ngrx/store';
import { Observable }              from 'rxjs/Observable';

import { UserPreference }    from '../preference';
import { AuthActions }       from '../actions';
import { AppState }          from '../reducers';

let t = require('./topbar.html');
@Component({
    selector: 'topbar',
    template: t,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent implements OnInit {

    auth$: Observable<any>;
    
    constructor(private store: Store<AppState>,
                private router: Router) {
        this.auth$ = store.select('auth');
    }
    
    ngOnInit() {}

    /*
    get username() { return this.authService.name; }
    get uuid()     { return this.authService.uuid; }
    get myDomains() { return this.authService.domains; }
    get curDomain() { return this.authService.curDomain; }
    */
    
    get menuColor()    { return UserPreference.menuColor(); }
    get menuBgColor()  { return UserPreference.menuBgColor(); }
    get myTopbarMenus()  { return UserPreference.myTopbarMenus(); }

    logout() {
        this.store.dispatch(AuthActions.logout());
        this.router.navigate(['/login']);
    }

    /**
     * Wwitch domain user currently managing
     * @param key
     */
    private switch2Domain(key: string) {
        //this.authService.switch2Domain(key);
    }
    
    private cleanDefaultDomain() {
        //this.authService.unsetDefaultDomain();
    }
}
