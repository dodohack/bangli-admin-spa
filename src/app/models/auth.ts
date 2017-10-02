/**
 * This is the definition domain type 
 */
export class Domain {
    id: number;
    key: string;
    name: string;
    url: string; /* Frontend url */
    description: string;

    dashboard_user: boolean; // Only used by AuthUser domain management
}


/* Decoded JWT payload */
export class JwtPayload {
    iss: string;
    iat: number;
    exp: number;
    nbf: number;
    jti: string;
    dbu: number; /* Is a dashboard user */
    spu: number; /* Is a super user */
    dpn: string; /* display name */
    sub: string; /* uuid */
    aud: string; /* login name */
}
