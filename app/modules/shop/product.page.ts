/**
 * This is the single product edit page component
 */

import { Component }             from '@angular/core';
import { OnInit, OnDestroy }     from '@angular/core';
import { ViewChild }             from '@angular/core';
import { ActivatedRoute }        from '@angular/router';
import { Store }                 from '@ngrx/store';

import { EntityPage }        from '../base/entity.page';
import { ENTITY }            from '../../models';
import { AppState, getProduct }  from '../../reducers';
import { AuthState }             from '../../reducers/auth';
import { CmsAttrsState }         from '../../reducers/cmsattrs';
import { ShopAttrsState }        from "../../reducers/shopattrs";
import { AlertActions }          from "../../actions";

import { FroalaOptions }         from '../../models/froala.option';
import { Product }               from '../../models';
import { Category }              from '../../models';
import { Tag }                   from '../../models';
import { Brand }                 from '../../models';
import { zh_CN }                 from '../../localization';


@Component({ template: require('./product.page.html') })
export class ProductPage extends EntityPage
{
    @ViewChild('productForm') productForm;

    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>) {
        super(ENTITY.SHOP_PRODUCT, route, store);
    }

    canDeactivate() {
        console.log("form status: ", this.productForm);
        if (this.productForm.dirty) {
            this.store.dispatch(AlertActions.error('请先保存当前更改，或取消保存'));
            return false;
        } else {
            return true;
        }
    }

    get zh() { return zh_CN.product };
}
