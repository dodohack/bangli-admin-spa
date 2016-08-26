/**
 * This is the definition domain type 
 */



    
export class Domain {
    public key: string;
    public name: string;
    public api: string; /* API server base address */
    public url: string; /* Frontend url */
    public checked: boolean;
    public userRoleId: number;

    constructor(domain: Domain) {
        this.key     = domain.key;
        this.name    = domain.name;
        this.api     = domain.api;
        this.url     = domain.url;
        this.checked = domain.checked;
        /* FIXME: Should be changed to better solution */
        this.userRoleId = domain.userRoleId;
    }
}
