/**
 * Defines payload of decoded JWT
 */

export class JwtPayLoad
{
    constructor(public iss: string,
                public iat: number,
                public exp: number,
                public nbf: number,
                public jti: string,
                public dbu: boolean, /* Is a dashboard user */
                public spu: boolean, /* Is a super user */
                public sub: string,
                public aud: string) {}
}
