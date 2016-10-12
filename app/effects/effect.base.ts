import { Headers }                   from '@angular/http';
import { rehydrateApplicationState } from 'ngrx-store-localstorage';

import { AuthState } from '../reducers/auth';

export class BaseEffects {
    _auth: AuthState;

    private initAuth() {
        if (!this._auth) {
            let rehydrate = rehydrateApplicationState(['auth'], localStorage);
            this._auth = rehydrate.auth;
        }
    }

    // Get cached _token or rehydrate it from localStorage
    get token() {
        if (this._auth) return this._auth.token;
        this.initAuth();
        return this._auth.token;
    }

    // Get cached _token or rehydrate it from localStorage
    get jwt() {
        if (this._auth) return this._auth.jwt;
        this.initAuth();
        return this._auth.jwt;
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