/**
 * This file exports correct API server endpoints based on given Domain key.
 */
import { API_HULUWA }    from './huluwa';
import { API_BANGLI }    from './bangli';

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

export const API_END_POINTS = {
    huluwa_uk: API_HULUWA,
    bangli_uk: API_BANGLI,
    bangli_us: API_BANGLI,
    bangli_de: API_BANGLI,
    bangli_fr: API_BANGLI,
    bangli_es: API_BANGLI,
    bangli_it: API_BANGLI
};

/* Authentication server api endpoint */
export const AUTH = {
    endpoint: AUTH_API,

    /* Authentication routes */
    register: AUTH_API + '/register',
    login:    AUTH_API + '/login',
    refresh:  AUTH_API + '/refresh',
    update_password: AUTH_API + '/update_password',
    
    /* Domains management - superuser only API */
    domains: AUTH_API + '/domains',
    domains_user: AUTH_API + '/domains/user',
};
