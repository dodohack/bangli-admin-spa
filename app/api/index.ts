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
    
    /* Domains get/post api */
    domains: AUTH_API + '/domains',
};

/*
 * CAN THIS BE DEPRECATED??
 * FIXME: 'checked' status can't be signed to variable defined as type Domain[],
 * the value is always true no matter what, see user.domain.mgt.ts for more.
 * Cause this is assignemnt between different type??
 */
export const DOMAINS = [
    /* FIXME: Remove userRoleId */

    { key: 'huluwa_uk', name: '葫芦娃',
        api: APIS.huluwa_uk, url: 'http://www.huluwa.uk',  checked: false, userRoleId: 0},

    { key: 'bangli_uk', name: '英国邦利',
        api: APIS.bangli_uk, url: 'http://www.bangli.uk', checked: false, userRoleId: 0},

    { key: 'bangli_us', name: '美国邦利',
        api: APIS.bangli_us, url: 'http://www.bangli.us', checked: false, userRoleId: 0},

    { key: 'bangli_de', name: '德国邦利',
        api: APIS.bangli_de, url: 'http://www.bangli.de', checked: false, userRoleId: 0},

    { key: 'bangli_fr', name: '法国邦利',
        api: APIS.bangli_fr, url: 'http://www.bangli.fr', checked: false, userRoleId: 0},

    { key: 'bangli_es', name: '西班牙邦利',
        api: APIS.bangli_es, url: 'http://www.bangli.es', checked: false, userRoleId: 0},

    { key: 'bangli_it', name: '意大利邦利',
        api: APIS.bangli_it, url: 'http://www.bangli.it', checked: false, userRoleId: 0}
];
