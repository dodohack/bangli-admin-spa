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

/**
 * This is the definition of the input of a register form
 */

export class Register {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public password_confirmation: string,
        public callback: string
    ){ }

    /* Return stringified string for form post */
    public stringify() : string {
        return 'name=' + this.name + '&email=' + this.email +
            '&password=' + this.password + '&password_confirmation=' +
            this.password_confirmation + '&callback=' + this.callback;
    }
}

export class RegisterError {
    constructor(
        public name: string,
        public email: string,
        public password: string
    ) {}

    public reset() {
        this.name = '';
        this.email = '';
        this.password = '';
    }
}
