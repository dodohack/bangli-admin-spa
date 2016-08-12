import { Component } from '@angular/core';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap';

import { AuthService }         from '../service';
import { UserPreference }      from '../preference';

let template = require('./topbar.html');
@Component({
    selector: 'topbar',
    template: template,
    directives: [ DROPDOWN_DIRECTIVES ]
})
export class TopbarComponent {

    constructor(private authService: AuthService) {}

    get username() { return this.authService.name; }
    get uuid()     { return this.authService.uuid; }
    get myDomains() { return this.authService.domains; }
    get curDomain() { return this.authService.curDomain; }

    get menuColor()    { return UserPreference.menuColor(); }
    get menuBgColor()  { return UserPreference.menuBgColor(); }
    get myTopbarMenus()  { return UserPreference.myTopbarMenus(); }

    /**
     * Wwitch domain user currently managing
     * @param key
     */
    private switch2Domain(key: string) {
        this.authService.switch2Domain(key);
    }
    
    private cleanDefaultDomain() {
        this.authService.unsetDefaultDomain();
    }
}
