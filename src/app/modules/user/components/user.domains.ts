/**
 * Display backend user website accessibility, role and permission.
 */
import { Component, Input, Output }   from '@angular/core';
import { EventEmitter}                from '@angular/core';
import { ChangeDetectionStrategy }    from '@angular/core';

import { AuthUser }        from '../../../models';
import { Domain  }         from '../../../models'

@Component({
    selector: 'user-domains-tab',
    templateUrl: './user.domains.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDomainsTab
{
    _user: AuthUser;
    @Input() set user(u: AuthUser) { this._user = Object.assign({}, u); }
    get user() { return this._user; }

    // All domains
    @Input() allDomains: Domain[];

    @Input() isSuperUser: boolean;

    @Output() toggleDomain    = new EventEmitter();
    @Output() toggleSuperUser = new EventEmitter();
    @Output() save            = new EventEmitter();

    canUseDashboard(id: number) {
        if (this.user.domains[id] === 1) return true;
        return false;
    }

    isRegistered(id: number) {
        if (this.user.domains[id] != undefined) return true;
        return false;
    }

    get isUserSuperUser() { return this.user && this.user.super_user; }
}
