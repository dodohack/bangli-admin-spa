/**
 * This is the component for managing vouchers
 */

import '@ngrx/core/add/operator/select';
import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { EntitiesPage }      from '../base/entities.page';
import { AppState }          from '../../reducers';
//import { Ping }              from '../../ping';
import { ENTITY }            from '../../models';

import { zh_CN } from '../../localization';

@Component({ template: require('./products.page.html') })
export class VouchersPage extends EntitiesPage
{
    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>/*,
                 protected ping: Ping*/) {
        super(ENTITY.VOUCHER, route, store/*, ping*/);
    }

    get zh() { return zh_CN.product; }
}
