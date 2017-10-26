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
import { Helper }      from '../../helper';

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
    status: string;
    filterAuthor: string;
    filterEditor: string;
    filterCat: string;
    filterBrand: string;
    filterDateType: string;
    filterDateFrom: string;
    filterDateTo: string;


    subParams: any;
    subQParams: any;

    constructor(protected helper: Helper,
                protected route: ActivatedRoute,
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
        this.status = params['status'] || 'all';
    }

    initQueryParams(params: Params) {
        this.queryParams = params;
        this.filterAuthor = params['author'] || '';
        this.filterEditor = params['editor'] || '';
        this.filterCat    = params['category'] || '';
        this.filterBrand  = params['brand'] || '';
        this.filterDateType  = params['datetype'] || '';
        let dateFrom = params['datefrom'] || Date.now();
        this.filterDateFrom = this.helper.MySQLDateGMT(dateFrom, true);
        let dateTo   = params['dateto'] || Date.now();
        this.filterDateTo   = this.helper.MySQLDateGMT(dateTo, false);
    }

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
            case ENTITY.POST:
                return cat.posts_count;
            case ENTITY.TOPIC:
                return cat.topics_count;
            case ENTITY.OFFER:
                return cat.offers_count;
            default:
                console.error("Unhandled entity type: ", this.etype);
        }
    }

    /**
     * Count of entities per editor 
     */
    editorWorkCount(editor: any) {
        switch(this.etype) {
            case ENTITY.POST:
                return editor.posts_by_editor_count;
            case ENTITY.TOPIC:
                return editor.topics_by_editor_count;
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
                '/page/' + page + '/status/' + this.status;
        else
            return '/' + this.slug + '/page/' + page + '/status/' + this.status;
    }
}
