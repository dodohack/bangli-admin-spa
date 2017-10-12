/**
 * This file exports correct API server endpoints based on given Domain key.
 */
export * from './path';
export * from '../../.config';

import { AUTH_BASE } from '../../.config';


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
