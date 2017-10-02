import { Component, Input, Output }from '@angular/core';
import { OnInit, OnDestroy }       from '@angular/core';
import { EventEmitter }            from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute }          from '@angular/router';
import { Params, Router }          from '@angular/router';
import { NavigationExtras }        from '@angular/router';

import { User }        from '../../models';
import { Channel }     from '../../models';
import { Category }    from '../../models';
import { Brand }       from '../../models';
import { ENTITY }      from '../../models';

@Component({
    selector: 'list-filter-bar',
    templateUrl: './list-filter-bar.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListFilterBar implements OnInit, OnDestroy {

    @Input() entityParams: any; // DEPRECATED

    // The entity type of lists passed in
    @Input() etype: string;
    @Input() slug: string;
    @Input() zh: any;
    @Input() authors: User[];
    @Input() editors: User[];
    @Input() cmsChannels: Channel[];
    @Input() categories: Category[];
    @Input() brands: Brand[];
    @Input() paginator: any;


    queryParams: Params;
    curChannelSlug: string;
    state: string;
    filterAuthor: string;
    filterEditor: string;
    filterCat: string;
    filterBrand: string;
    filterDateType: string;
    // MySQL date format is different from ECMA standard, we use filterDisplayDate
    // for displaying in the HTML, and use filterDate for MySQL. This fixes
    // the bug in Safari browser.
    _filterDateFrom: string;
    _filterDateTo: string;
    _filterDisplayDateFrom: string;
    _filterDisplayDateTo: string;

    // Datapicker of entity filtering is hidden by default
    dpHidden = true;

    subParams: any;
    subQParams: any;

    constructor(protected route: ActivatedRoute,
                protected router: Router) { }

    /**
     * We must do the subscription here in order to do 2 way update between the
     * route url and the selected filters.
     */
    ngOnInit() {
        this.subParams = this.route.params.subscribe(p => this.initParams(p));
        this.subQParams = this.route.queryParams.subscribe(p => this.initQueryParams(p));
    }

    ngOnDestroy() {
        this.subParams.unsubscribe();
        this.subQParams.unsubscribe();
    }

    initParams(params: Params) {
        this.curChannelSlug = params['channel'] || null;
        this.state = params['state'] || 'all';
    }

    initQueryParams(params: Params) {
        this.queryParams = params;
        this.filterAuthor = params['author'] || '';
        this.filterEditor = params['editor'] || '';
        this.filterCat    = params['category'] || '';
        this.filterBrand  = params['brand'] || '';
        this.filterDateType  = params['datetype'] || '';
        let dateFrom = params['datefrom'] || Date.now();
        this._filterDateFrom = this.getMySQLDateGMT(dateFrom, true);
        this._filterDisplayDateFrom = this.getDisplayDateGMT(dateFrom, true);
        let dateTo   = params['dateto'] || Date.now();
        this._filterDateTo   = this.getMySQLDateGMT(dateTo, false);
        this._filterDisplayDateTo = this.getDisplayDateGMT(dateTo, false);
    }

    GMT(value) {
        let d = new Date(value);
        let offset = d.getTimezoneOffset() / 60;
        // Patch user timezone offset, so we can get the GMT
        d.setHours(d.getHours() - offset);
        return d;
    }

    /**
     * Return MySQL compatible date in GMT
     * We set from date start from 00:00:00 of the day and to date end with
     * 23:59:59 of the day.
     */
    getMySQLDateGMT(value, isDateFrom: boolean) {
        let d = this.GMT(value);
        if (isDateFrom)
            return d.toISOString().slice(0,10) + ' 00:00:00';
        else
            return d.toISOString().slice(0,10) + ' 23:59:59';
    }

    /**
     * Return ECMA compatible date format
     */
    getDisplayDateGMT(value, isDateFrom: boolean) {
        let d = this.GMT(value);
        if (isDateFrom)
            return d.toISOString().slice(0,10) + 'T00:00:00';
        else
            return d.toISOString().slice(0,10) + 'T23:59:59';
    }

    get filterDateFrom() { return this._filterDateFrom; }
    set filterDateFrom(value) { this._filterDateFrom = this.getMySQLDateGMT(value, true); }
    get filterDateTo() { return this._filterDateTo; }
    set filterDateTo(value) { this._filterDateTo = this.getMySQLDateGMT(value, false); }

    get filterDisplayDateFrom() { return this._filterDisplayDateFrom; }
    set filterDisplayDateFrom(value) { this._filterDisplayDateFrom = this.getDisplayDateGMT(value, true); }
    get filterDisplayDateTo() { return this._filterDisplayDateTo; }
    set filterDisplayDateTo(value) { this._filterDisplayDateTo = this.getDisplayDateGMT(value, false); }

    /**
     * Submit the filter
     */
    submitFilter() {
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

        this.router.navigate(['/', this.slug], navigationExtras);
    }


    /**
     * Categories of current channel or non filtered categories.
     */
    get catsOfChannel() {
        // No channel is selected, return all categories
        if (!this.curChannelSlug || !this.cmsChannels)
            return this.categories;

        let curChannel =
            this.cmsChannels.filter(c => c.slug == this.curChannelSlug)[0];

        // Return categories belongs to current channel
        return this.categories.filter(c => c.channel_id === curChannel.id);
    }

    /**
     * Count of entities per category 
     */
    catCount(cat: any) {
        switch(this.etype) {
            case ENTITY.CMS_POST:
                return cat.posts_count;
            case ENTITY.CMS_TOPIC:
                return cat.topics_count;
            case ENTITY.CMS_DEAL:
                return cat.deals_count;
            case ENTITY.SHOP_PRODUCT:
                return cat.products_count;
            default:
                console.error("Unhandled entity type: ", this.etype);
        }
    }

    /**
     * Count of entities per editor 
     */
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

    /**
     * We can loop over the array returned by this function to greatly simplify
     * the html template, this 4 elements represent the state and style of
     * 'first', 'previous', 'next' and 'last' pages.
     */
    get pagers() {
        return [
            {
                index: 1,
                icon: 'fa-angle-double-left',
                disabled: this.paginator.cur_page === 1
            },
            {
                index: this.paginator.pre_page,
                icon: 'fa-angle-left',
                disabled: this.paginator.cur_page === this.paginator.pre_page
            },
            {
                index: this.paginator.next_page,
                icon: 'fa-angle-right',
                disabled: this.paginator.cur_page === this.paginator.next_page
            },
            {
                index: this.paginator.last_page,
                icon: 'fa-angle-double-right',
                disabled: this.paginator.cur_page === this.paginator.last_page
            },
        ];
    }

    /**
     * Pagination url
     */
    pageUrl(page) {
        if (this.curChannelSlug)
            return '/' + this.slug + '/channel/' + this.curChannelSlug +
                '/page/' + page + '/state/' + this.state;
        else
            return '/' + this.slug + '/page/' + page + '/state/' + this.state;
    }
}
