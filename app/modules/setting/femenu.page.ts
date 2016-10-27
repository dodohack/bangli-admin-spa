/**
 * Frontend menu setting page, configure the pregenerated menu for frontend
 * desktop and mobile SPA.
 */
import { Component, ViewChild } from '@angular/core';
import { OnInit, OnDestroy }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { Store }                from '@ngrx/store';
import { Observable }           from 'rxjs/Observable';

import { FeMenu }            from "../../models";
import { FeMenuActions }     from "../../actions";

import {
    AppState,
    getFeRootMenus,
    getFeRootMenuIds,
    getFeMenuGroupIds,
    getFeMenuParentIds,
    getFeMenus,
    getFeMobileMenus,
    getFeDesktopMenus }      from '../../reducers';


@Component({ template: require('./femenu.page.html') })
export class FeMenuPage implements OnInit, OnDestroy
{
    feMenuRoots$: Observable<any>;
    feMenuRootIds$: Observable<number[]>;
    feMenuGroupIds$: Observable<any>;
    feMenuParentIds$: Observable<number[]>;
    feMenus$: Observable<any>;
    //feMobileMenus$: Observable<FeMenu[]>;
    //feDesktopMenus$: Observable<FeMenu[]>;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {}

    ngOnInit() {
        this.feMenus$        = this.store.let(getFeMenus());
        this.feMenuRootIds$  = this.store.let(getFeRootMenuIds());
        this.feMenuRoots$    = this.store.let(getFeRootMenus());
        this.feMenuGroupIds$ = this.store.let(getFeMenuGroupIds());
        this.feMenuParentIds$ = this.store.let(getFeMenuParentIds());
        //this.feMobileMenus$ = this.store.let(getFeMobileMenus());
        //this.feDesktopMenus$ = this.store.let(getFeDesktopMenus());

        this.store.dispatch(FeMenuActions.loadAll());
    }

    ngOnDestroy() {}
}
