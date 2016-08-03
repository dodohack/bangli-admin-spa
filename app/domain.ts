/**
 * This static class provides a way to manage the content of different websites
 * by using sessionStorage key 'domain'.
 */

export const DOMAINS = [
    { key: 'huluwauk', name: '葫芦娃',   url: 'http://www.huluwa.uk' },
    { key: 'bangliuk', name: '英国邦利', url: 'http://www.bangli.uk' },
    { key: 'banglius', name: '美国邦利', url: 'http://www.bangli.us' },
    { key: 'banglide', name: '德国邦利', url: 'http://www.bangli.de' },
    { key: 'banglifr', name: '法国邦利', url: 'http://www.bangli.fr' },
    { key: 'banglies', name: '西班牙邦利', url: 'http://www.bangli.es' },
    { key: 'bangliit', name: '意大利邦利', url: 'http://www.bangli.it' },
];

export class Domain
{
    /**
     * Init current domain if we don't have, this should be always called
     * at the beginning of program initializing
     */
    public static init() {
        let domain: string = sessionStorage.getItem('domain.key');
        if (!domain) {
            sessionStorage.setItem('domain.key',  DOMAINS[0].key);
            sessionStorage.setItem('domain.name', DOMAINS[0].name);
            sessionStorage.setItem('domain.url',  DOMAINS[0].url);
        }
    }

    /**
     * Return current domain the backend is managing
     * @returns {any}
     */
    public static getKey(): string  { return sessionStorage.getItem('domain.key'); }
    public static getName(): string { return sessionStorage.getItem('domain.name'); }
    public static getUrl(): string  { return sessionStorage.getItem('domain.url'); }

    /**
     * Set current domain the backend is going to manage
     * @param key
     */
    public static set(key: string) {
        sessionStorage.setItem('domain.key',  key);
        DOMAINS
        sessionStorage.setItem('domain.name', key);
        sessionStorage.setItem('domain.url',  key);
    }
}
