/**
 * This file exports correct API server endpoints based on given Domain key.
 */
import { AUTH_API_BASE } from '../models/domain';
import { API_HULUWA_UK } from './huluwa.uk';
import { API_BANGLI_UK } from './bangli.uk';
import { API_BANGLI_US } from './bangli.us';
import { API_BANGLI_DE } from './bangli.de';
import { API_BANGLI_FR } from './bangli.fr';
import { API_BANGLI_ES } from './bangli.es';
import { API_BANGLI_IT } from './bangli.it';

export const API_END_POINTS = {
    huluwa_uk: API_HULUWA_UK,
    bangli_uk: API_BANGLI_UK,
    bangli_us: API_BANGLI_US,
    bangli_de: API_BANGLI_DE,
    bangli_fr: API_BANGLI_FR,
    bangli_es: API_BANGLI_ES,
    bangli_it: API_BANGLI_IT
};

/* Authentication server api endpoint */
export const AUTH = {
    endpoint: AUTH_API_BASE,

    /* Authentication with email/password */
    register: AUTH_API_BASE + '/register',
    login: AUTH_API_BASE + '/login',
    
    /* Domains get/post api */
    domains: AUTH_API_BASE + '/domains',
};
