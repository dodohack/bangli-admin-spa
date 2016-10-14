/**
 * This file exports correct API server endpoints based on given Domain key.
 */
export * from './path';

export const AUTH_API = 'http://localhost:10000';
export const APIS = {
    huluwa_uk: 'http://localhost:5000/admin',
    bangli_uk: 'http://localhost:5001/admin',
    bangli_us: 'http://localhost:5002/admin',
    bangli_de: 'http://localhost:5003/admin',
    bangli_fr: 'http://localhost:5004/admin',
    bangli_es: 'http://localhost:5005/admin',
    bangli_it: 'http://localhost:5006/admin'
};

export const IMG_SERVER = {
    huluwa_uk: 'http://localhost:5000',
    bangli_uk: 'http://localhost:5001',
    bangli_us: 'http://localhost:5002',
    bangli_de: 'http://localhost:5003',
    bangli_fr: 'http://localhost:5004',
    bangli_es: 'http://localhost:5005',
    bangli_it: 'http://localhost:5006'
};

/* Authentication server api endpoint */
export const AUTH = {
    endpoint: AUTH_API,

    // TODO: DEPRECATED SOME OF THESE
    /* Authentication routes */
    register: AUTH_API + '/register',
    login:    AUTH_API + '/login',
    refresh:  AUTH_API + '/refresh',
    update_password: AUTH_API + '/update_password',
    
    /* User auth and domain management */
    user:    AUTH_API + '/user',
    // TODO: Add following support
    // user/register
    // user/login
    // user/refresh
    // user/...
};
