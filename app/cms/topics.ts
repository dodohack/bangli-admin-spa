/**
 * This is the topic list management page component
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Title }             from '@angular/platform-browser';

import { Pagination }  from '../models/pagination';
import { PostStatus }  from '../models/post';

import { UserService }  from '../service/user.service';
import { TopicService } from '../service/topic.service';

import {
    PaginatorComponent, DateFilterComponent,
    SearchBoxComponent, ListPageHeaderComponent ,
    ListPageMenuComponent } from "../components";

let template = require('./topics.html');
@Component({
    template: template,
    directives: [
        PaginatorComponent,
        DateFilterComponent,
        SearchBoxComponent,
        ListPageHeaderComponent,
        ListPageMenuComponent
    ],
    providers: [ TopicService ]
})
export class TopicsPage implements OnInit {
    /* Pagination related variables of the list */
    pagination = new Pagination(0, 1, 0, 0, 1, 0, 0, 0, 0);

    /* Parameter to <list-page-menu> */
    baseUrl = 'topic/list';
    /* Parameter to <paginator> */
    deepUrl: string;

    /* Parameter to <list-page-header> */
    pageTitle = '专题';
    newItemUrl = 'topic/new';

    /* TopicStatus translation, the same as PostStatus */
    statuses: PostStatus[];

    /* Posts filters: any, editor, status */
    filter:any;
    condition:any;

    /* The list of topics, array */
    topics:any;

    /* Editors object */
    editors:any;

    /* Categories object */
    categories:any;

    /* Post status object */
    status: any;

    /* If select all checkbox is checked or not */
    checkedAll:boolean = false;

    constructor(private route:ActivatedRoute,
                private userService: UserService,
                private topicService: TopicService,
                private titleService:Title) {}

    /**
     * Initialize the page, we should only put DI initializition into ctor.
     * If no role/page is setting from URL segment, we will display the first
     * page of all customers by default.
     */
    ngOnInit()
    {
        /* Set document title */
        this.titleService.setTitle('文章列表 - 葫芦娃管理平台');

        this.pagination.per_page = this.topicService.perPage;

        this.initTopicStatuses();
        this.initEditors();

        /* Get URL segments and update the list */
        this.route.params.subscribe(
            segment => {
                this.filter = segment['filter'] ? segment['filter'] : 'all';
                this.condition = segment['cond'] ? segment['cond'] : 'all';
                this.deepUrl = this.baseUrl + '/' + this.filter + '/' + this.condition;
                /* '+' magically converts string to number */
                this.pagination.current_page = segment['page'] ? +segment['page'] : 1;
                /* Update post list when URL changes */
                this.getTopicsList();
            }
        );
    }

    /**
     * Get list of editors
     */
    private initEditors() {
        this.userService.authors.subscribe(
            authors =>
                this.editors = authors.filter(people => people.role != 'author')
        );
    }

    /**
     * Get topics list page menu
     */
    private initTopicStatuses() {
        this.topicService.statuses.subscribe(
            statuses => this.statuses = statuses,
            error => console.error(error)
        );
    }

    /**
     * Return user display name by given ID
     * @param id
     */
    private getNicenameById(id) {
        for (let i = 0; i < this.editors.length; i++) {
            if (this.editors[i].id == id) {
                if (this.editors[i].nicename == null)
                    return this.editors[i].name;
                else
                    return this.editors[i].nicename;
            }
        }
    }

    /**
     * Get a list of topics
     */
    private getTopicsList() {
        this.topicService.getTopics(this.filter, this.condition,
            this.pagination.current_page)
            .subscribe(
                json => {
                    this.topics = json['data'];
                    this.pagination.setup(json);
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
     * Set number of topics displayed per list
     */
    public setTopicsPerPage() {
        this.topicService.setTopicsPerPage(this.pagination.per_page);
        /* Update the list view */
        this.getTopicsList();
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