// Imports for loading & configuring the in-memory web api
import { enableProdMode, PLATFORM_DIRECTIVES } from '@angular/core';
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS, JSONP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { App } from './app';
import { APP_ROUTER_PROVIDERS } from './app.routes';

/* Inject these service globally, so the can be used anywhere as a singleton */
import { UserService } from './service/user.service';

if (process.env.ENV === 'production') {
    enableProdMode();
}

bootstrap(App, [
    APP_ROUTER_PROVIDERS,
    HTTP_PROVIDERS, JSONP_PROVIDERS,
    Title, UserService,
    { provide: PLATFORM_DIRECTIVES, useValue: [ROUTER_DIRECTIVES], multi: true },
    disableDeprecatedForms(), provideForms()
])
.catch((err: any) => console.error(err));
