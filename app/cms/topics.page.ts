/**
 * This is the topic list management page component
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

import { Topic, Category, Paginator, PostStatus }  from '../models';
import { UserService, PostService, TopicService }  from '../service';

import { zh_CN } from '../localization';

@Component({
    template: require('./topics.html')
})
export class TopicsPage implements OnInit {

    /* Parameter to <list-page-menu> */
    baseUrl    = 'topic/list';
    /* Parameter to <paginator> */
    deepUrl: string;

    /* Posts filters: any, editor, status */
    filter:any;
    condition:any;

    /* The list of topics, array */
    topics: Topic[];

    /* Post status object */
    status: any;

    /* If select all checkbox is checked or not */
    checkedAll:boolean = false;

    pagination = new Paginator;

    constructor(private route:ActivatedRoute,
                private userService: UserService,
                private topicService: TopicService,
                private postService: PostService) {}

    /**
     * Initialize the page, we should only put DI initializition into ctor.
     * If no role/page is setting from URL segment, we will display the first
     * page of all customers by default.
     */
    ngOnInit()
    {
        /* Get URL segments and update the list */
        this.route.params.subscribe(
            segment => {
                this.filter = segment['filter'] ? segment['filter'] : 'all';
                this.condition = segment['cond'] ? segment['cond'] : 'all';
                this.deepUrl = this.baseUrl + '/' + this.filter + '/' + this.condition;
                /* '+' magically converts string to number */
                this.pagination.cur_page = segment['page'] ? +segment['page'] : 1;
                /* Update post list when URL changes */
                this.getTopicsList();
            }
        );
    }

    get zh() { return zh_CN.post; };
    get editors() { return this.userService.editors; };
    get categories() { return this.postService.categories; };

    get statuses() { return this.topicService.statuses; }

    /**
     * Return user display name by given ID
     * @param id
     */
    private getNicenameById(id) {
        for (let i = 0; i < this.editors.length; i++) {
            if (this.editors[i].id == id) {
                if (this.editors[i].display_name == null)
                    return this.editors[i].name;
                else
                    return this.editors[i].display_name;
            }
        }
    }

    /**
     * Get a list of topics
     */
    private getTopicsList() {
        this.topicService.getTopics(this.filter, this.condition,
            this.pagination.cur_page)
            .subscribe(
                json => {
                    this.topics = json['data'];
                    //this.pagination.setup(json);
                },
                error => console.error(error),
                () => {
                    /*
                     * Add checkbox data to each posts
                     *
                     * FIXME: This actually should be placed into ngOnInit, but
                     * we don't know the member of the model returned from API
                     * server yet, so we can only access them when this.posts
                     * is fully initialized.
                     */
                    this.initCheckbox();
                }
            );
    }

    /**
     * Add extra entries to the topic
     */
    private initCheckbox() {
        let length = this.topics.length;
        for (let i = 0; i < length; i++) {
            this.topics[i].checked = false;
            this.topics[i].editing = false;
        }
    }

    /**
     * Toggle all checkbox
     */
    private checkboxAll() {
        this.checkedAll = !this.checkedAll;
        let length = this.topics.length;
        for (let i = 0; i < length; i++) {
            this.topics[i].checked = this.checkedAll;
        }
    }

    /**
     * Change current table row to editable mode if double click on this
     * row is detected.
     *
     * @param $event  - mouse double click event
     * @param i       - index of table row, starts from 0
     */
    private fastEditCurrentTopic($event, i) {
        this.topics[i].editing = !this.topics[i].editing;
        //console.log("double clicked detected: " + i);
        //console.log($event);
    }
}