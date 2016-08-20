import { Component }               from '@angular/core';
import { Input, Output }           from '@angular/core';
import { EventEmitter }            from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'topbar',
    template: require('./topbar.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Topbar {
    
    _auth;
    @Input() set auth(value) { this._auth = Object.assign({}, value); }

    get auth() { return this._auth; }

    @Output() logout = new EventEmitter();
    @Output() switchDomain = new EventEmitter();

    /**
     * Wwitch domain user currently managing
     * @param key
     */
    private switch2Domain(key: string) {
        //this.authService.switch2Domain(key);
    }
}