/**
 * This is the single product edit page component
 */

import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ViewChild }         from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Location }          from '@angular/common';
import { Router }            from '@angular/router';
import { Store }             from '@ngrx/store';

import { EntityPage }        from '../base/entity.page';
import { ENTITY }            from '../../models';
import { AppState }          from '../../reducers';
import { AlertActions }      from "../../actions";
import { zh_CN }             from '../../localization';


@Component({ template: require('./product.page.html') })
export class ProductPage extends EntityPage
{
    constructor(protected route: ActivatedRoute,
                protected location: Location,
                protected store: Store<AppState>,
                protected router: Router) {
        super(ENTITY.SHOP_PRODUCT, route, location, store, router);
    }

    get zh() { return zh_CN.product };


    get previewUrl(): string {
        return this.frontendUrl + 
            ENTITY_INFO[this.etype].slug + '/' + this.entity.guid;
    }
}
