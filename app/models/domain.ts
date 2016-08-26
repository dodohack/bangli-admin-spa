/**
 * This is the definition domain type 
 */

export class Domain {
    key: string;
    name: string;
    api: string; /* API server base address */
    url: string; /* Frontend url */
    checked: boolean;
    userRoleId: number;
}
