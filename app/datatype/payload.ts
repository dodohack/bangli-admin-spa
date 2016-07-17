/**
 * Defines payload of decoded JWT
 */

export class Payload
{
    constructor(public iss: string,
                public iat: number,
                public exp: number,
                public nbf: number,
                public jti: string,
                public sub: string,
                public aud: string) {}
}