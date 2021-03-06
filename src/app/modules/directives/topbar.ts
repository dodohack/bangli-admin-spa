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
    templateUrl: './topbar.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Topbar {
    @Input() isPingEnabled: boolean;
    @Input() domainKeys: string[];
    @Input() domains: any;
    @Input() curDomainKey: string;
    @Input() jwt: JwtPayload;
    // This is a workaround to fix angular-cli bug:
    // https://github.com/angular/angular-cli/issues/2034
    @Input() pref = null as PreferenceState;
    @Input() latencies: any; // App server connectivities

    @Output() logout      = new EventEmitter();
    @Output() loginDomain = new EventEmitter();
    @Output() togglePing  = new EventEmitter();

    getLatency(key) {
        // FIXME: Reenable this when auth is enabled.
        /*
        if (this.isPingEnabled)
            return this.latencies[key].delta + 'ms';
        else
        */
            return 'DISABLED';
    }
    
    isOffline(key) {
        // FIXME: Reenable this when auth is enabled.
        /*
        if (!this.latencies[key].delta || this.latencies[key].delta === 0)
            return true;
            */
        return false;
    }
}
