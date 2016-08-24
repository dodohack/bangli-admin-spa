/**
 * This is the topic list management page component
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { Topic, Category, Paginator, PostStatus }  from '../models';

import { AppState }          from '../reducers';
import { TopicActions }      from '../actions';

import { zh_CN } from '../localization';

@Component({
    template: require('./topics.page.html')
})
export class TopicsPage implements OnInit {

    /* Topics state in ngrx */
    topicsState$: Observable<any>;


    constructor(private route:ActivatedRoute,
                private store: Store<AppState>) {
        this.topicsState$ = this.store.select('topics');
    }

    /**
     * Initialize the page, we should only put DI initializition into ctor.
     * If no role/page is setting from URL segment, we will display the first
     * page of all customers by default.
     */
    ngOnInit() {
        /* TODO: Get status/author/editor from url as well */
        this.route.params.subscribe(params => {
            let cur_page = params['page'] ? params['page'] : '1';
            this.store.dispatch(TopicActions.loadTopics({cur_page: cur_page}));
        });
    }

    get zh() { return zh_CN.post; };
    //get editors() { return this.userService.editors; };
    //get categories() { return this.postService.categories; };
    //get statuses() { return this.topicService.statuses; }
}