import { Component }               from '@angular/core';
import { Input, Output }           from '@angular/core';
import { EventEmitter }            from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef }       from '@angular/core';

import { Domain }           from '../../models';
import { JwtPayload }       from '../../models';
import { PreferenceState }  from '../../reducers/preference';

@Component({
    selector: 'topbar',
    template: require('./topbar.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Topbar {
    @Input() domainKeys: string[];
    @Input() domains: any;
    @Input() curDomainKey: string;
    @Input() jwt: JwtPayload;
    @Input() pref: PreferenceState;

    @Output() logout = new EventEmitter();
    @Output() loginDomain = new EventEmitter();

    _latency: {[key: string]: number} = {};

    constructor(private cd: ChangeDetectorRef) {
        /*
        this.ping.latency$.subscribe(l => {
           this._latency = l;
            cd.markForCheck();
        });
        */
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
