// Imports for loading & configuring the in-memory web api
import { enableProdMode } from '@angular/core';
import { XHRBackend }     from '@angular/http';

// The usual bootstrapping imports
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS, JSONP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { App } from './app';
import { APP_ROUTER_PROVIDERS } from './app.routes';

/* Inject these service globally, so the can be used anywhere as a singleton */
import { MenuService } from './service/menu.service';
import { AuthService } from './service/auth.service';

if (process.env.ENV === 'production') {
    enableProdMode();
}

bootstrap(App, [
    APP_ROUTER_PROVIDERS,
    HTTP_PROVIDERS, JSONP_PROVIDERS,
    MenuService, AuthService,
    disableDeprecatedForms(), provideForms()
])
.catch((err: any) => console.error(err));
