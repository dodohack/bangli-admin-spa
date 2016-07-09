/**
 * This is the definition of the input of a login form
 */

export class Login {

    constructor(public email: string, public password: string){ }

    /* Return stringified string for form post */
    public stringify() : string
    {
        return 'email=' + this.email + '&password=' + this.password;
    }
}

