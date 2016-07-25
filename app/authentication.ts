/**
 * This is the authentication entry point of admin.huluwa.uk
 */

import { Component }         from '@angular/core';

@Component({
    selector: 'authentication',
    template:
    `
    <router-outlet></router-outlet>
    `,
    directives: []
})
export class AuthComponent
{
    constructor() {
        console.log("AuthComponent initialized");
    }
}
