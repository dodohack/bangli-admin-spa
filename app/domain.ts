/**
 * This static class provides a way to manage the content of different websites
 * by using sessionStorage key 'domain'.
 */

export const DOMAINS = ['huluwa.uk', 'bangli.uk', 'bangli.us'];

export class Domain
{
    /**
     * Return current domain the backend is managing
     * @returns {any}
     */
    public static get(): string {
        let domain: string = sessionStorage.getItem('domain');

        if (!domain) {
            /* default domain */
            domain = DOMAINS[0];
            sessionStorage.setItem('domain', domain);
        }

        return domain;
    }

    /**
     * Set current domain the backend is going to manage
     * @param domain
     */
    public static set(domain: string) {
        sessionStorage.setItem('domain', domain);
    }

    /**
     * Set default domain the backend will manage
     * @param domain
     */
    public static setDefault(domain: string) {
        sessionStorage.setItem('domain', domain);
    }
}
