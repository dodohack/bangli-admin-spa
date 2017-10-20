/**
 * Cms setting page menu
 */
import { Component }  from '@angular/core';
import { Store }      from '@ngrx/store';
import { Observable, Subject } from "rxjs";

import { AppState, getOfferFilters }  from "../../reducers";
import { OfferFilter }                from "../../models";
import * as OfferFilterActions        from '../../actions/offer.filter';


@Component({ templateUrl: './offer.filter.page.html' })
export class OfferFilterPage
{
    // Local copy of contents
    contents: string[] = [];

    filters$: Observable<OfferFilter[]>;

    public keyUp = new Subject<any>();

    constructor(private store: Store<AppState>) {
        this.filters$ = this.store.select(getOfferFilters);

        // Load all filters
        this.store.dispatch(new OfferFilterActions.LoadAll());

/*
        this.keyUp.map(event => event.target.value)
            .debounceTime(3000)
            .distinctUntilChanged()
            .subscribe(text => console.log("Updated ", this.selectedIndex, ", content: ", text));
            */
    }

    save(type: string) {
        this.store.dispatch(new OfferFilterActions.Save(
            {ftype: type, data: this.contents[type]}));
    }

    /**
     * Only enable save button when content changes.
     * @param type
     * @param oldContent
     * @returns {boolean}
     */
    isSaveDisabled(type: string, oldContent: string) {
        if (typeof this.contents[type] === 'undefined') return true;
        if (this.contents[type] == oldContent) return true;
        return false;
    }
}
