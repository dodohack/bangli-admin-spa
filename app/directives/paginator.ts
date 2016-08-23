/**
 * List page paginator
 */
import { Component, Input } from "@angular/core";
import { ChangeDetectionStrategy } from '@angular/core';

import { UsersState } from '../reducers/users';

@Component({
    selector: 'paginator',
    template: require('./paginator.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Paginator {
    
    @Input() base: string;

    @Input() usersState: UsersState;

    get paginator() { return this.usersState.paginator; }
}
