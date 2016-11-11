/**
 *
 */
import { Component }      from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router }         from '@angular/router';
import { Store }          from '@ngrx/store';

import { APIS, API_PATH } from '../../api';
import { CacheSingleton } from '../../effects/cache.singleton';
import { EntitiesPage }   from '../base/entities.page';
import { ENTITY }         from '../../models';
import { AppState }       from '../../reducers';
import { zh_CN }          from '../../localization';


@Component({ template: require('./galleries.page.html') })
export class GalleriesPage extends EntitiesPage
{
    cache = CacheSingleton.getInstance();

    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router) {
        super(ENTITY.ATTACHMENT, route, store, router, true/* pageless */);
    }
}
