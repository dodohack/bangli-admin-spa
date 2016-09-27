import { Component, Input, Output }from '@angular/core';
import { EventEmitter }            from '@angular/core';
import { OnInit, OnDestroy }       from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router }  from '@angular/router';
import { NavigationExtras }        from '@angular/router';

import { ENTITY }      from '../../models';
import { ENTITY_INFO } from '../../models';
import { zh_CN }       from '../../localization';

@Component({
    selector: 'list-filter-bar',
    template: require('./list-filter-bar.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListFilterBar implements OnInit, OnDestroy {

    @Input() authors: any;
    @Input() editors: any;
    @Input() categories: any;
    @Input() brands: any;
    @Input() paginator: any;

    // The entity type of lists passed in
    @Input() etype: string;
    
    // URL parameters and query parameters
    state: string;
    filterAuthor: string;
    filterEditor: string;
    filterCat: string;
    filterBrand: string;
    filterDateType: string;
    _filterDateFrom: string;
    _filterDateTo: string;
    // Datapicker hidden by default
    dpHidden = true;

    // Subscribers
    subParams;
    subQParams;

    constructor(private route: ActivatedRoute,
                private router: Router) {}

    ngOnInit() {
        this.subParams = this.route.params.subscribe(params => {
            this.state = params['state'] || 'all';
        });

        this.subQParams = this.route.queryParams.subscribe(queryParams => {
            // NOTE: We initialize these to empty string instead of null
            // because select->option value can't be null.
            this.filterAuthor = queryParams['author'] || '';
            this.filterEditor = queryParams['editor'] || '';
            this.filterCat    = queryParams['category'] || '';
            this.filterBrand    = queryParams['brand'] || '';
            this.filterDateType = queryParams['datetype'] || '';
            this._filterDateFrom = queryParams['datefrom'] || Date.now();
            this._filterDateFrom = this.GMT(this.filterDateFrom, true);
            this._filterDateTo = queryParams['dateto'] || Date.now();
            this._filterDateTo =  this.GMT(this.filterDateTo, false);
        });
    }

    ngOnDestroy() {
        this.subParams.unsubscribe();
        this.subQParams.unsubscribe();
    }

    /**
     * Return MySQL compatible date in GMT
     * We set from date start from 00:00:00 of the day and to date end with
     * 23:59:59 of the day.
     */
    GMT(value, isDateFrom: boolean) {
        let d = new Date(value);
        let offset = d.getTimezoneOffset() / 60;
        // Patch user timezone offset, so we can get the GMT
        d.setHours(d.getHours() - offset);
        if (isDateFrom)
            return d.toISOString().slice(0,10) + ' 00:00:00';
        else
            return d.toISOString().slice(0,10) + ' 23:59:59';
    }

    get filterDateFrom() { return this._filterDateFrom; }
    set filterDateFrom(value) { this._filterDateFrom = this.GMT(value, true); }
    get filterDateTo() { return this._filterDateTo; }
    set filterDateTo(value) { this._filterDateTo = this.GMT(value, false); }

    get baseUrl() { if (this.etype) return ENTITY_INFO[this.etype].slug; }
    get zh() { return zh_CN[this.baseUrl]; }

    get hasAuthorFilter() { return this.etype === ENTITY.CMS_POST; }
    get hasEditorFilter() {
        switch (this.etype) {
            case ENTITY.CMS_POST:
            case ENTITY.CMS_PAGE:
            case ENTITY.CMS_TOPIC:
            case ENTITY.SHOP_PRODUCT:
                return true;
            default:
                return false;
        }
    }
    
    catCount(cat: any) {
        switch(this.etype) {
            case ENTITY.CMS_POST:
                return cat.posts_count;
            case ENTITY.CMS_TOPIC:
                return cat.topics_count;
            case ENTITY.SHOP_PRODUCT:
                return cat.products_count;
            default:
                console.error("Unhandled entity type: ", this.etype);
        }
    }

    editorWorkCount(editor: any) {
        switch(this.etype) {
            case ENTITY.CMS_POST:
                return editor.posts_by_editor_count;
            case ENTITY.CMS_TOPIC:
                return editor.topics_by_editor_count;
            case ENTITY.SHOP_PRODUCT:
                return editor.products_by_editor_count;
            default:
                return null;
        }
    }

    // Submit filter
    onSubmitFilter() {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                'author':   this.filterAuthor,
                'editor':   this.filterEditor,
                'category': this.filterCat,
                'brand':    this.filterBrand,
                'datetype': this.filterDateType,
                'datefrom': this.filterDateFrom,
                'dateto':   this.filterDateTo }
        };

        this.router.navigate(['/', this.baseUrl], navigationExtras);
    }

    /**
     * We can loop over the array returned by this function to greatly simplify
     * the html template, this 4 elements represent the state and style of
     * 'first', 'previous', 'next' and 'last' pages.
     */
    get pagers() {
        return [
            { index: 1, icon: 'fa-angle-double-left',
              disabled: this.paginator.cur_page === 1 },
            { index: this.paginator.pre_page, icon: 'fa-angle-left',
              disabled: this.paginator.cur_page === this.paginator.pre_page },
            { index: this.paginator.next_page, icon: 'fa-angle-right',
              disabled: this.paginator.cur_page === this.paginator.next_page},
            { index: this.paginator.last_page, icon: 'fa-angle-double-right',
              disabled: this.paginator.cur_page === this.paginator.last_page},
        ];
    }

    /**
     * Pagination url
     */
    pageUrl($page, $state) {
        if (this.etype === ENTITY.USER)
            return '/' + this.baseUrl + '/page/' + $page + '/role/' + $state;
        else
            return '/' + this.baseUrl + '/page/' + $page + '/state/' + $state;

    } 
}
