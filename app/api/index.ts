/**
 * This file exports correct API server endpoints based on given Domain key.
 */
export * from './path';
export * from '../../.config.ts';

import { AUTH_BASE } from '../../.config.ts';

// FIXME: We shouldn't set IMG_SERVER here, we should always
// FIXME: passing back image full url from API server. So we
// FIXME: have single truth of source and easy to maintain.
// FIXME: And we keep only 1 copy of admin SPA untouched as long as possible.
/*
export const IMG_SERVER = {
    huluwa_uk: 'http://localhost:5000',
    bangli_uk: 'http://localhost:5001',
    bangli_us: 'http://localhost:5002',
    bangli_de: 'http://localhost:5003',
    bangli_fr: 'http://localhost:5004',
    bangli_es: 'http://localhost:5005',
    bangli_it: 'http://localhost:5006'
};
*/

/* Authentication server api endpoint */
export const AUTH = {
    endpoint: AUTH_BASE,

    // TODO: DEPRECATED SOME OF THESE
    /* Authentication routes */
    register: AUTH_BASE + '/register',
    login:    AUTH_BASE + '/login',
    refresh:  AUTH_BASE + '/refresh',
    update_password: AUTH_BASE + '/update_password',
    
    /* User auth and domain management */
    user:    AUTH_BASE + '/user',
    // TODO: Add following support
    // user/register
    // user/login
    // user/refresh
    // user/...
};
