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
    getFeMenus,
    getFeMobileMenus,
    getFeDesktopMenus }      from '../../reducers';


@Component({ template: require('./femenu.page.html') })
export class FeMenuPage implements OnInit, OnDestroy
{
    feMenus$: Observable<any>;
    //feMobileMenus$: Observable<FeMenu[]>;
    //feDesktopMenus$: Observable<FeMenu[]>;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {}

    ngOnInit() {
        this.feMenus$ = this.store.let(getFeMenus());
        //this.feMobileMenus$ = this.store.let(getFeMobileMenus());
        //this.feDesktopMenus$ = this.store.let(getFeDesktopMenus());

        this.store.dispatch(FeMenuActions.loadAll());
    }

    ngOnDestroy() {}
}
