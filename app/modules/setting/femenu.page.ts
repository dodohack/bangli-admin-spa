/**
 * Frontend menu setting page, configure the pregenerated menu for frontend
 * desktop and mobile SPA.
 */
import { Component, ViewChild } from '@angular/core';
import { OnInit, OnDestroy }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { Store }                from '@ngrx/store';
import { Observable }           from 'rxjs/Observable';

import { Channel }           from "../../models";
import { FeMenu }            from "../../models";
import { FeMenuActions }     from "../../actions";

import {
    AppState,
    getCmsChannels,
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
    // Popup modal
    @ViewChild('modalEdit')   modalEdit;

    isRoot: boolean;   // Is adding/editing a root menu
    isL1Menu: boolean; // Is adding/editing l1 menu
    menu: FeMenu; // A menu object
    actionType: string; // 'add' or 'edit' action

    channels$:    Observable<Channel[]>;
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
        this.channels$       = this.store.let(getCmsChannels());
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

    onEdit($event: FeMenu) {
        this.menu = $event;
        if ($event.parent_id) this.isRoot = false;
        else                  this.isRoot = true;
        this.actionType = 'edit';
        this.modalEdit.show();
    }

    onAdd($event: any) {
        this.menu = {name: null, device: 'DESKTOP', slug: null,
            parent_id: $event.pid, group: $event.gid, channel_id: null};
        this.isRoot   = ($event.pid == 0);
        this.isL1Menu = ($event.l1 == true);
        this.actionType = 'add';
        this.modalEdit.show();
    }

    // Actions
    newMenu($event: FeMenu) {
        this.store.dispatch(FeMenuActions.addMenu($event));
    }

    saveMenu($event: FeMenu) {
        this.store.dispatch(FeMenuActions.saveMenu($event));
    }

    removeMenu($event: FeMenu) {
        this.store.dispatch(FeMenuActions.deleteMenu($event));
    }
}
