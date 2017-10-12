import { rehydrateApplicationState } from 'ngrx-store-localstorage';

import { AuthState } from '../reducers/auth';
import { IMG_SERVER } from '../api';

export class CacheSingleton {

    // The singleton
    private static _instance: CacheSingleton = new CacheSingleton();

    _auth: AuthState;

    constructor() {
        if (CacheSingleton._instance) {
            throw new Error("Error: Use CacheSingleton.getInstance() instead ");
        }
        CacheSingleton._instance = this;
    }

    public static getInstance(): CacheSingleton {
        return CacheSingleton._instance;
    }


    // '_auth' is only initialized once
    private _initAuth() {
        if (!this._auth) {
            // FIXME: 3rd parameter!
            let rehydrate = rehydrateApplicationState(['auth'], localStorage, (key) => key);
            // Cache auth to app lifespan scope
            this._auth = rehydrate.auth;
            // Init app scope key to key stored sessionStorage if it is there
            // Otherwise cache a default key to sessionStorage
            if (sessionStorage.getItem('key'))
                this._auth.key = sessionStorage.getItem('key');
            else
                sessionStorage.setItem('key', this._auth.key);
        }
    }

    // Get cached _token or rehydrate it from localStorage
    get token() {
        this._initAuth();
        return this._auth.token;
    }

    // Get cached _token or rehydrate it from localStorage
    get jwt() {
        this._initAuth();
        return this._auth.jwt;
    }

    // Get all available domain keys
    get keys() {
        this._initAuth();
        return this._auth.keys;
    }

    // Get current domain key
    get key() {
        this._initAuth();
        return this._auth.key;
    }

    // Update current domain key
    set key(key: string) {
        this._initAuth();
        this._auth.key = key;
        sessionStorage.setItem('key', key);
    }

    // Return image server url
    // TODO: Should we use local defined IMG_SERVER or the one passed from remote?
    get img_server() {
        this._initAuth();
        return IMG_SERVER[this._auth.key];
        //return this._auth.img_server;
    }

    /**
     * Clean cache
     */
    clean() {
        this._auth = undefined;
        sessionStorage.removeItem('key');
    }
}