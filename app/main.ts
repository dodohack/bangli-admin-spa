// Imports for loading & configuring the in-memory web api
import { enableProdMode } from '@angular/core';
import { XHRBackend } from '@angular/http';

// The usual bootstrapping imports
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HTTP_PROVIDERS, JSONP_PROVIDERS } from '@angular/http';

import { App } from './app';


if (process.env.ENV === 'production') {
    enableProdMode();
}

bootstrap(App, [ROUTER_PROVIDERS, HTTP_PROVIDERS, JSONP_PROVIDERS]);