import { Headers }                   from '@angular/http';
import { rehydrateApplicationState } from 'ngrx-store-localstorage';

export class BaseEffects {
    // Auth token string
    _token: string;

    // Get cached _token or rehydrate it from localStorage
    get token() {
        if (this._token) return this._token;
        let rehydrate = rehydrateApplicationState(['auth'], localStorage);
        this._token = rehydrate.auth.token;
        return this._token;
    }

    get headers() {
        return new Headers({
            'Authorization': 'Bearer' + this.token,
            'Content-Type': 'application/json'
        });
    }

    // Cached domain key
    get key() { return sessionStorage.getItem('key'); }
    set key(key: string) { sessionStorage.setItem('key', key); }
}