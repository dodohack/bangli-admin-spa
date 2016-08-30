import { Component, Input }        from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router }  from '@angular/router';
import { NavigationExtras }        from '@angular/router';

import { zh_CN }    from '../../localization';

@Component({
    selector: 'list-filter-bar',
    template: require('./list-filter-bar.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListFilterBar {

    @Input() authors: any;
    @Input() editors: any;
    @Input() categories: any;
    @Input() paginator: any;

    // The type of lists passed in
    @Input() isPost: boolean;
    @Input() isTopic: boolean;
    @Input() isProduct: boolean;
    @Input() isOrder: boolean;
    @Input() isPage: boolean;
    @Input() isUser: boolean;

    // URL parameters and query parameters
    state: string;
    filterAuthor: string;
    filterEditor: string;
    filterCat: string;
    filterDateFrom: string;
    filterDateTo: string;

    constructor(private route: ActivatedRoute,
                private router: Router) {
        this.route.params.subscribe(params => {
            this.state = params['state'] || 'all';
        });
        
        this.route.queryParams.subscribe(queryParams => {
            this.filterAuthor = queryParams['author'] || '';
            this.filterEditor = queryParams['editor'] || '';
            this.filterCat    = queryParams['category'] || '';
            this.filterDateFrom = queryParams['datefrom'] || '';
            this.filterDateTo = queryParams['dateto'] || '';
        });
    }

    get baseUrl() {
        if (this.isPost)    return 'post';
        if (this.isTopic)   return 'topic';
        if (this.isProduct) return 'product';
        if (this.isOrder)   return 'order';
        if (this.isPage)    return 'page';
        if (this.isUser)    return 'user';
    }

    get zh() { return zh_CN[this.baseUrl]; }

    catCount(cat: any) {
        if (this.isPost) return cat.posts_count;
        if (this.isTopic) return cat.topics_count;
        if (this.isProduct) return cat.products_count;
    }

    editorWorkCount(editor: any) {
        if (this.isPost) return editor.posts_by_editor_count;
        if (this.isTopic) return editor.topics_by_editor_count;
        if (this.isProduct) return editor.products_by_editor_count;
    }

    // Submit filter
    // TODO: filterDate from start/to
    onSubmitFilter() {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                'author':   this.filterAuthor,
                'editor':   this.filterEditor,
                'category': this.filterCat,
                'datefrom': this.filterDateFrom,
                'dateto':   this.filterDateTo }
        };

        // FIXME: Hardcoded path
        this.router.navigate(['/post/page/1/state/all'], navigationExtras);
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
}
