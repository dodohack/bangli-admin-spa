/**
 * This static class provides a way to manage the content of different websites
 * by using sessionStorage key 'domain'.
 */

export const DOMAIN_KEYS = [
    'huluwa_uk',
    'bangli_uk',
    'bangli_us',
    'bangli_de',
    'bangli_fr',
    'bangli_es',
    'bangli_it'
];

export const DOMAINS = {
    huluwa_uk: { name: '葫芦娃',   url: 'http://www.huluwa.uk'},
    bangli_uk: { name: '英国邦利',  url: 'http://www.bangli.uk'},
    bangli_us: { name: '美国邦利',  url: 'http://www.bangli.us'},
    bangli_de: { name: '德国邦利',  url: 'http://www.bangli.de'},
    bangli_fr: { name: '法国邦利',  url: 'http://www.bangli.fr'},
    bangli_es: { name: '西班牙邦利', url: 'http://www.bangli.es'},
    bangli_it: { name: '意大利邦利', url: 'http://www.bangli.it'}
};

export class Domain
{
    /**
     * Init current domain if we don't have, this should be always called
     * at the beginning of program initializing
     */
    public static init() {
        let domain: string = sessionStorage.getItem('domain');
        if (!domain || domain == undefined) {
            sessionStorage.setItem('domain',  DOMAIN_KEYS[0]);
        }
    }

    /**
     * Return current domain the backend is managing
     * @returns {any}
     */
    public static get(): string   {
        return sessionStorage.getItem('domain');
    }

    /**
     * Set current domain the backend is going to manage
     * @param key
     */
    public static set(key: string) {
        sessionStorage.setItem('domain',  key);
    }
}
