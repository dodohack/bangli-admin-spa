/**
 * Display backend user website accessibility, role and permission.
 */
import { Component, Input, Output }   from '@angular/core';
import { EventEmitter}                from '@angular/core';
import { ChangeDetectionStrategy }    from '@angular/core';

import { User }            from '../../../models';
import { Domain  }         from '../../../models/domain'

@Component({
    selector: 'user-domains-tab',
    template: require('./user.domains.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDomainsTab
{
    @Input()
    _user: User;
    @Input() set user(value) { this._user = Object.assign({}, value); }
    get user() { return this._user; }

    @Input()
    isSuperUser: boolean;

    @Output()
    save = new EventEmitter();

    get domains() { return this._user.domains; }

    /*
    get userRoles() { return this.userService.roles; }

    */

    /* Save per website permssions for user to business api server */
    onSubmitDomainPerms() {
    }

}
