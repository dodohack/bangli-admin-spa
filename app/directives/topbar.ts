import { Component }               from '@angular/core';
import { Input, Output }           from '@angular/core';
import { EventEmitter }            from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { User }           from '../models';
import { Preference }     from '../models';

@Component({
    selector: 'topbar',
    template: require('./topbar.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Topbar {
    @Input() auth: User;
    @Input() pref: Preference;

    @Output() logout = new EventEmitter();
    @Output() switchDomain = new EventEmitter();
}
