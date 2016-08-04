/**
 * This static class provides a way to manage the content of different websites
 * by using sessionStorage key 'domain'.
 *
 * Current managed domain is persisted in localStorage, and
 * loaded into sessionStorage when app bootstrap.
 *
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
        /* Get domain from session */
        let domain: string = sessionStorage.getItem('domain');
        
        /* If no domain stored in session, try to get it from localStorage */
        if (!domain)
            domain = localStorage.getItem('domain');
        
        if (!domain) {
            /* No domain data stored in both session and local storage, 
             * init both. */
            this.set(DOMAIN_KEYS[0]);
            return;
        }

        /* Validate the key */
        if (!this.validateDomainKey(domain)) {
            /* Update invalid key to default one */
            this.set(DOMAIN_KEYS[0]);
        } else {
            /* Initial domain in session from local storage */
            sessionStorage.setItem('domain', domain);
        }
    }

    /**
     * Check if given domain key valid
     * @param domain
     * @returns {boolean}
     */
    public static validateDomainKey(domain: string) {
        for (let i in DOMAIN_KEYS) {
            if (DOMAIN_KEYS[i] === domain) {
                return true;
            }
        }
        return false;
    }

    /**
     * Return current domain the backend is managing
     * @returns {any}
     */
    public static getKey(): string   {
        return sessionStorage.getItem('domain');
    }

    public static getName(): string {
        let key = sessionStorage.getItem('domain');
        return DOMAINS[key].name;
    }

    public static getUrl(): string {
        let key = sessionStorage.getItem('domain');
        return DOMAINS[key].url;
    }

    /**
     * Set current domain the backend is going to manage
     * @param key
     */
    public static set(key: string) {
        sessionStorage.setItem('domain',  key);
        localStorage.setItem('domain',  key);
    }
}
