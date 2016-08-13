/**
 * This is the definition domain related type and const
 */
export const AUTH_API_BASE = 'http://localhost:10000';

export const APP_API_BASE = {
    huluwa_uk: 'http://localhost:5000',
    bangli_uk: 'http://localhost:5001',
    bangli_us: 'http://localhost:5002',
    bangli_de: 'http://localhost:5003',
    bangli_fr: 'http://localhost:5004',
    bangli_es: 'http://localhost:5005',
    bangli_it: 'http://localhost:5006'
};

/*
 * FIXME: 'checked' status can't be signed to variable defined as type Domain[],
 * the value is always true no matter what, see user.domain.mgt.ts for more.
 * Cause this is assignemnt between different type?? 
 */
export const DOMAINS = [
    /* The first is a placeholder domain use as first time initialization */
    
    { key: 'huluwa_uk', name: '葫芦娃',
      api: APP_API_BASE['huluwa_uk'], url: 'http://www.huluwa.uk',  checked: false},

    { key: 'bangli_uk', name: '英国邦利',
      api: APP_API_BASE['bangli_uk'], url: 'http://www.bangli.uk', checked: false},

    { key: 'bangli_us', name: '美国邦利',
      api: APP_API_BASE['bangli_us'], url: 'http://www.bangli.us', checked: false},

    { key: 'bangli_de', name: '德国邦利',
      api: APP_API_BASE['bangli_de'], url: 'http://www.bangli.de', checked: false},

    { key: 'bangli_fr', name: '法国邦利',
      api: APP_API_BASE['bangli_fr'], url: 'http://www.bangli.fr', checked: false},

    { key: 'bangli_es', name: '西班牙邦利',
      api: APP_API_BASE['bangli_es'], url: 'http://www.bangli.es', checked: false},

    { key: 'bangli_it', name: '意大利邦利',
      api: APP_API_BASE['bangli_it'], url: 'http://www.bangli.it', checked: false}
];
    
export class Domain {
    public key: string;
    public name: string;
    public api: string; /* API server base address */
    public url: string; /* Frontend url */
    public checked: boolean;

    constructor(domain: Domain) {
        this.key     = domain.key;
        this.name    = domain.name;
        this.api     = domain.api;
        this.url     = domain.url;
        this.checked = domain.checked;
    }
}
