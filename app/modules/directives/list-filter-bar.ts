import { Component, Input, Output }from '@angular/core';
import { EventEmitter }            from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { User }        from '../../models';
import { Channel }     from '../../models';
import { Category }    from '../../models';
import { Brand }       from '../../models';
import { ENTITY }      from '../../models';
import { EntityParams }from '../../models';

@Component({
    selector: 'list-filter-bar',
    template: require('./list-filter-bar.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListFilterBar {

    @Input() slug: string;
    @Input() zh: any;
    @Input() entityParams: EntityParams;
    @Input() authors: User[];
    @Input() editors: User[];
    @Input() cmsChannels: Channel[];
    @Input() categories: Category[];
    @Input() brands: Brand[];
    @Input() paginator: any;

    // The entity type of lists passed in
    @Input() etype: string;

    // Filter event
    @Output() filterEvent = new EventEmitter();

    // FIXME: Fix the relationship of default value for entityParams
    // FIXME: and local version of filterParams
    // Local copy of filter params
    //filterParams = new EntityParams;
    state: string;
    filterAuthor: string;
    filterEditor: string;
    filterCat: string;
    filterBrand: string;
    filterDateType: string;
    filterDateFrom: string;
    filterDateTo: string;

    // Datapicker of entity filtering is hidden by default
    dpHidden = true;

    // FIXME: Fix the relationship of these, so we do not need to do copy here
    submitFilter() {
        this.entityParams.author   = this.filterAuthor;
        this.entityParams.editor   = this.filterEditor;
        this.entityParams.category = this.filterCat;
        this.entityParams.brand    = this.filterBrand;
        this.entityParams.datetype = this.filterDateType;
        this.entityParams.datefrom = this.filterDateFrom;
        this.entityParams.dateto   = this.filterDateTo;
        this.filterEvent.emit(this.entityParams);
    }


    /**
     * Categories of current channel.
     */
    get catsOfChannel() {
        // No channel is selected, return all categories
        if (!this.entityParams || this.entityParams.channel || !this.cmsChannels)
            return this.categories;

        let curChannel =
            this.cmsChannels.filter(c => c.slug = this.entityParams.channel)[0];

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
    pageUrl($page, $state) {
        if (!this.entityParams || this.entityParams.channel)
            return '/' + this.slug + '/channel/' + this.entityParams.channel +
                '/page/' + $page + '/state/' + $state;
        else
            return '/' + this.slug + '/page/' + $page + '/state/' + $state;
    }
}
