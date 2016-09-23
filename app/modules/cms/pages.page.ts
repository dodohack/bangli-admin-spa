/**
 * This is the component for page list page
 */

import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';

import { EntitiesPage }      from '../base/entities.page';
import { ENTITY }            from '../../models';
import { AppState }          from '../../reducers';
//import { Ping }              from '../../ping';
import { zh_CN }             from '../../localization';

@Component({ template: require('./pages.page.html') })
export class PagesPage extends EntitiesPage
{
    constructor(protected route: ActivatedRoute,
                protected store: Store<AppState>/*,
                protected ping:  Ping*/) { 
        super(ENTITY.CMS_PAGE, route, store/*, ping*/);
    }

    get zh() { return zh_CN.cms; }
}
