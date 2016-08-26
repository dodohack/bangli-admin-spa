/**
 * This is a temporary solution get retrieve authenticated token and domain_key
 * globally, all the information is manually cached in session storage
 */
import { APIS, API_END_POINTS } from './api';

export class AuthCache {
    static token():string { return sessionStorage.getItem('token'); }
    static setToken(v: string) { if (v) sessionStorage.setItem('token', v); }

    static decodedToken():string { return sessionStorage.getItem('decoded_token'); }
    static setDecodedToken(v: string) { if (v) sessionStorage.setItem('decoded_token', v)};

    static domainKey(): string { return sessionStorage.getItem('domain_key'); }
    static setDomainKey(v: string) { if (v) sessionStorage.setItem('domain_key', v); }

    static API() { return APIS[AuthCache.domainKey()] + API_END_POINTS[AuthCache.domainKey()]; }
}
