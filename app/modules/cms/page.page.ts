/**
 * This is the single page page
 */

import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from "@angular/core";
import { ViewChild }         from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';

import { EntityPage }        from '../base/entity.page';
import { ENTITY }            from '../../models';
import { AlertActions }      from '../../actions';
import { AppState }          from '../../reducers';
import { zh_CN }             from '../../localization';

@Component({ template: require('./page.page.html') })
export class PagePage extends EntityPage
{
    @ViewChild('pageForm') pageForm;

    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>) {
        super(ENTITY.CMS_PAGE, route, store);
    }

    canDeactivate() {
        console.log("form status: ", this.pageForm);
        if (this.pageForm.dirty) {
            this.store.dispatch(AlertActions.error('请先保存当前更改，或取消保存'));
            return false;
        } else {
            return true;
        }
    }

    get zh() { return zh_CN.cms; } // Localization
}
