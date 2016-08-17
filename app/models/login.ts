/**
 * This is the definition of the input of a login form
 */

export interface Login {

    email: string;
    password: string;

    /* Old deprecated, should be removed after bug fix
    public stringify() : string
    {
        return 'email=' + this.email + '&password=' + this.password;
    }
    */
}
