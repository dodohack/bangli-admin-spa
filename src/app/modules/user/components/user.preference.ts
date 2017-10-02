/**
 * Display dashboard user local settings, only users can use dashboard
 * will have this displayed
 */
import { Component }     from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { Preference } from '../../../models';

@Component({
    selector: 'user-preference',
    template: require('./user.preference.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPreferenceTab
{
    _pref: Preference;
    @Input() set pref(value) { this._pref = Object.assign({}, value); }
    get pref() { return this._pref; }
    
    /* Count of items per list page */
    counts = [10, 20, 30, 40, 50, 100, 150, 200];
    
    @Output() save = new EventEmitter();
}
