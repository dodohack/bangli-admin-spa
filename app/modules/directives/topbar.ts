import { Component }               from '@angular/core';
import { Input, Output }           from '@angular/core';
import { EventEmitter }            from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef }       from '@angular/core';

import { AuthState }      from '../../reducers/auth';
import { Preference }     from '../../models';
import { Ping }           from '../../ping';

@Component({
    selector: 'topbar',
    template: require('./topbar.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Topbar {
    @Input() auth: AuthState;
    @Input() pref: Preference;

    @Output() logout = new EventEmitter();
    @Output() loginDomain = new EventEmitter();

    _latency: {[key: string]: number} = {};

    constructor(private cd: ChangeDetectorRef,
                private ping: Ping) {
        this.ping.latency$.subscribe(l => {
           this._latency = l;
            cd.markForCheck();
        });
    }

    latency(key) {
        if (this.isOffline(key)) {
            return '离线';
        } else if (this._latency[key]) {
            return Math.floor(this._latency[key]) +'ms';
        }
    }
    
    isOffline(key) {
        if (!this._latency[key] || this._latency[key] === -1)
            return true;
        return false;
    }
}
