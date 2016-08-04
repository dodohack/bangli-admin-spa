/**
 * This file exports correct API server endpoints based on given Domain key.
 */

import { Domain } from '../domain';
import { API_HULUWA_UK } from './huluwa.uk';
import { API_BANGLI_UK } from './bangli.uk';
import { API_BANGLI_US } from './bangli.us';
import { API_BANGLI_DE } from './bangli.de';
import { API_BANGLI_FR } from './bangli.fr';
import { API_BANGLI_ES } from './bangli.es';
import { API_BANGLI_IT } from './bangli.it';

/* API servers */
const END_POINTS = {
    huluwa_uk: API_HULUWA_UK,
    bangli_uk: API_BANGLI_UK,
    bangli_us: API_BANGLI_US,
    bangli_de: API_BANGLI_DE,
    bangli_fr: API_BANGLI_FR,
    bangli_es: API_BANGLI_ES,
    bangli_it: API_BANGLI_IT
};

/* Authentication server */
const auth_base: string = 'http://localhost:10000';


/* Static class, get API endpoints for current managed domain */
export class Api {
    public static getEndPoint(key?: string) {
        if (key)
            return END_POINTS[key];
        else
            return END_POINTS[Domain.getKey()];
    }
}

/* Authentication server APIs */
export const AUTH = {
    endpoint: auth_base,

    /* Authentcation with email/password */
    register: auth_base + '/register',
    login: auth_base + '/login',
};
