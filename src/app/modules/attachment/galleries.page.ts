/**
 *
 */
import { Component }      from '@angular/core';
import { Input, Output }  from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router }         from '@angular/router';
import { Store }          from '@ngrx/store';

import { APIS, API_PATH } from '../../api';
import { CacheSingleton } from '../../effects/cache.singleton';
import { EntitiesPage }   from '../base/entities.page';
import { ENTITY }         from '../../models';
import { AppState }       from '../../reducers';
import { zh_CN }          from '../../localization';
import * as EntityActions from "../../actions/entity";


@Component({
    selector: 'galleries',
    templateUrl: './galleries.page.html'
})
export class GalleriesPage extends EntitiesPage
{
    cache = CacheSingleton.getInstance();

    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>,
                protected router: Router) {
        super(ENTITY.ATTACHMENT, route, store, router, true/*pageless*/);
    }

    /**
     * When a item uploaded successfully, we can add it to the head of the
     * image list, also display the <img ...> tag to let user to easily copy
     * and to insert into the froala editor
     * @param $event
     */
    onCompleteItem($event) {
        this.store.dispatch(
            new EntityActions.LoadEntitySuccess(
                {etype: ENTITY.ATTACHMENT, data: $event, prepend: true}));
    }
}

/**
 * TODO: Should we use flex layout to re-layout the gallery page???
 * TODO: or do it later after we finish the main logic.
 */
