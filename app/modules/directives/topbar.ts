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
    @Input() latencies: any; // App server connectivities

    @Output() logout = new EventEmitter();
    @Output() loginDomain = new EventEmitter();

    getLatency(key) {
        return this.latencies[key].delta + 'ms';
    }
    
    isOffline(key) {
        if (!this.latencies[key].delta || this.latencies[key].delta === 0)
            return true;
        return false;
    }
}
