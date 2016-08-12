import { enableProdMode, PLATFORM_DIRECTIVES } from '@angular/core';
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS, JSONP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { provideForms } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { UserPreference } from './preference';
import { App } from './app';
import { APP_ROUTER_PROVIDERS } from './app.routes';
/* Inject these service globally, so they can be used anywhere as a singleton */
import { UserService, DomainService } from './service';

if (process.env.ENV === 'production') {
    enableProdMode();
}

/**
 * Must be called before bootstrap! 
 */
UserPreference.init();

bootstrap(App, [
    APP_ROUTER_PROVIDERS,
    HTTP_PROVIDERS, JSONP_PROVIDERS,
    Title, UserService, DomainService,
    { provide: PLATFORM_DIRECTIVES, useValue: [ROUTER_DIRECTIVES], multi: true },
    provideForms()
])
.catch((err: any) => console.error(err));
