/**
 * This is a temporary solution get retrieve authenticated token and domain_key
 * globally, all the information is manually cached in session storage
 */
import { APIS, API_PATH } from './api';
import { JwtPayload }           from "./models";

/**
 * FIXME: Can not use following getters in any constructors, as the data is
 * not available before login(no sessionStorage initialized), but constructors
 * such as effects constructors are initialized bofore login.
 */
export class AuthCache {
    static token():string { return sessionStorage.getItem('token'); }
    static cacheToken(v: string) { if (v) sessionStorage.setItem('token', v); }

    static jwt():JwtPayload { return JSON.parse(sessionStorage.getItem('jwt')); }
    static cacheJwt(v: JwtPayload) { if (v) sessionStorage.setItem('jwt', JSON.stringify(v))};

    static domainKey(): string { return sessionStorage.getItem('key'); }
    static cacheDomainKey(v: string) { if (v) sessionStorage.setItem('key', v); }

    static clean() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('key');
    }
    
    static API() { return APIS[AuthCache.domainKey()]; }
    static API_PATH() { return API_PATH[AuthCache.domainKey()] };
}
