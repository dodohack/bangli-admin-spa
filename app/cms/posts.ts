/**
 * This is the post list management page component
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Title }             from '@angular/platform-browser';

import { User, Pagination, PostStatus } from '../models';
import { PostService, UserService } from '../service';
import {
    PaginatorComponent, DateFilterComponent,
    SearchBoxComponent, ListPageHeaderComponent,
    ListPageMenuComponent } from '../components';


@Component({
    templateUrl: 'app/cms/posts.html',
    directives: [
        PaginatorComponent,
        DateFilterComponent,
        SearchBoxComponent,
        ListPageHeaderComponent,
        ListPageMenuComponent
    ],
    providers: [ PostService ]
})
export class PostsPage implements OnInit
{   
    /* Pagination related variables of the list */
    pagination = new Pagination(0, 1, 0, 0, 1, 0, 0, 0, 0);

    /* Parameter to <paginator>, post list page url with filter and condition */
    base = 'post/list';
    baseUrl: string;

    /* Parameter to <list-page-header> */
    pageTitle = '文章';
    newItemUrl = 'post/new';

    /* Post status */
    statuses: PostStatus[];

    /* Posts filters: any, author, editor, status */
    filter: any;
    condition: any;

    /* The list of posts, array */
    posts: any;

    /* Authors object */
    authors: User[];
    /* Editors object */
    editors: User[];
    
    /* Categories object */
    categories: any;
    /* Post status object */
    status: any;
    
    /* If select all checkbox is checked or not */
    checkedAll: boolean = false;

    constructor(private route: ActivatedRoute,
                private userService: UserService,
                private postService: PostService,
                private titleService: Title) {}

    /**
     * Initialize the page, we should only put DI initializition into ctor.
     * If no role/page is setting from URL segment, we will display the first
     * page of all customers by default.
     */
    ngOnInit()
    {
        /* Set document title */
        this.titleService.setTitle('文章列表 - 葫芦娃管理平台');

        this.pagination.per_page = this.postService.perPage;

        this.initPostStatuses();

        /* Retrieve authors and editors */
        this.userService.authors.subscribe(
            authors => {
                this.authors = authors;
                /* Editors are users can edit any posts */
                this.editors = authors.filter(people => people.role != 'author');
            }
        );

        /* Get URL segments and update the list */
        this.route.params.subscribe(
            segment => {
                this.filter = segment['filter'] ? segment['filter'] : 'all';
                this.condition = segment['cond'] ? segment['cond'] : 'all';
                this.baseUrl = this.base + '/' + this.filter + '/' + this.condition;
                /* '+' magically converts string to number */
                this.pagination.current_page = segment['page'] ? +segment['page'] : 1;
                /* Update post list when URL changes */
                this.getPostsList();
            }
        );
    }

    /**
     * Get posts list page menu
     */
    private initPostStatuses()
    {
        this.postService.statuses.subscribe(
            json  => {
                this.statuses = json;
            },
            error => console.error(error)
        );
    }

    /**
     * Return user display name by given ID
     * @param $id
     */
    private getNicenameById(id)
    {
        for (let i = 0; i < this.authors.length; i++) {
            if (this.authors[i].id == id) {
                if (this.authors[i].nicename == null)
                    return this.authors[i].name;
                else
                    return this.authors[i].nicename;
            }
        }
    }

    /**
     * Get a list of posts?
     */
    private getPostsList()
    {
        this.postService.getPosts(this.filter, this.condition,
                                  this.pagination.current_page)
            .subscribe(
                json => {
                    this.posts = json['data'];
                    this.pagination.setup(json);
                },
                error => console.error(error),
                ()    => {
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
     * Add extra entries to the post
     */
    private initCheckbox() {
        let length = this.posts.length;
        for (let i = 0; i < length; i++) {
            this.posts[i].checked = false;
            this.posts[i].editing = false;
        }
    }

    /**
     * Set number of posts displayed per list
     */
    public setPostsPerPage()
    {
        this.postService.setPostsPerPage(this.pagination.per_page);
        /* Update the list view */
        this.getPostsList();
    }


    /**
     * Toggle all checkbox
     */
    private checkboxAll()
    {
        this.checkedAll = !this.checkedAll;
        let length = this.posts.length;
        for (let i = 0; i < length; i++) {
            this.posts[i].checked = this.checkedAll;
        }
    }

    /**
     * Change current table row to editable mode if double click on this
     * row is detected.
     * 
     * @param $event  - mouse double click event
     * @param i       - index of table row, starts from 0 
     */
    private fastEditCurrentPost($event, i)
    {
        this.posts[i].editing = !this.posts[i].editing;
        //console.log("double clicked detected: " + i);
        //console.log($event);
    }
}