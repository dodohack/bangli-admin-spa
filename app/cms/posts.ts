/**
 * This is the post list management page component
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Title }             from '@angular/platform-browser';
import { TAB_DIRECTIVES, AlertComponent } from 'ng2-bootstrap';

import { PostService, UserService } from '../service';
import { User, Post, Category, Tag, Topic,
    Pagination, PostStatus } from '../models';
import {
    PaginatorComponent, DateFilterComponent,
    SearchBoxComponent, ListPageHeaderComponent,
    ListPageMenuComponent, FastEditPostFormComponent,
    CategoryTreeComponent, TagCloudComponent,
    TopicCloudComponent } from '../components';

import { zh_CN } from '../localization';

let template = require('./posts.html');
@Component({
    template: template,
    directives: [
        AlertComponent,
        TAB_DIRECTIVES,
        PaginatorComponent,
        DateFilterComponent,
        SearchBoxComponent,
        ListPageHeaderComponent,
        ListPageMenuComponent,
        FastEditPostFormComponent,
        CategoryTreeComponent,
        TagCloudComponent,
        TopicCloudComponent
    ],
    providers: [ PostService ]
})
export class PostsPage implements OnInit
{   
    /* Pagination related variables of the list */
    pagination = new Pagination(0, 1, 0, 0, 1, 0, 0, 0, 0);

    base = 'post/list';
    /* Parameter to <list-page-menu> */
    baseUrl = 'post/list/status';
    /* Parameter to <paginator> */
    deepUrl: string;
    
    /* Parameter to <list-page-header> */
    pageTitle = '文章';
    newItemUrl = 'post/new';

    /* Post status */
    statuses: PostStatus[];

    /* Posts filters: any, author, editor, status */
    filter: any;
    condition: any;

    /* The list of posts, array */
    posts: Post[];

    /* Authors object */
    authors: User[];
    /* Editors object */
    editors: User[];
    
    /* All post categories, tags, topics */
    categories: Category[];
    tags: Tag[];
    /* TODO: topic cloud should be optimized if the number is large */
    topics: Topic[];

    /* Post status object */
    status: any;
    
    /* If select all checkbox is checked or not */
    checkedAll: boolean = false;
    /* If is bulk action */
    bulkAction: string = 'none';
    bulkEditing: boolean = false;

    /* Right bar related */
    hideRightBar = true;
    showFilter   = true;
    tabs = {'cat': false, 'tag': false, 'topic': false};

    /* Alert message */
    alerts = Array<Object>();

    constructor(private route: ActivatedRoute,
                private userService: UserService,
                private postService: PostService,
                private titleService: Title) {
    }

    /* Localization, have to wrapper it as template only access component local
     * methods/properties */
    get zh() {
        return zh_CN.post;
    }

    /**
     * Initialize the page, we should only put DI initializition into ctor.
     * If no role/page is setting from URL segment, we will display the first
     * page of all customers by default.
     */
    ngOnInit() {
        /* Set document title */
        this.titleService.setTitle('文章列表 - 葫芦娃管理平台');

        this.pagination.per_page = this.postService.perPage;

        this.initPostStatuses();

        this.initAuthors();

        this.initCategories();

        this.initTags();

        this.initTopics();

        this.initPostsList();
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
     * Retrieve available authors and editors
     */
    private initAuthors() {
        this.userService.authors.subscribe(
            authors => {
                this.authors = authors;
                /* Editors are users can edit any posts */
                this.editors = authors.filter(people => people.role != 'author');
            }
        );
    }

    private initPostsList()
    {
        /* Get URL segments and update the list */
        this.route.params.subscribe(
            segment => {
                this.filter = segment['filter'] ? segment['filter'] : 'all';
                this.condition = segment['cond'] ? segment['cond'] : 'all';
                this.deepUrl = this.base + '/' + this.filter + '/' + this.condition;
                /* '+' magically converts string to number */
                this.pagination.current_page = segment['page'] ? +segment['page'] : 1;
                /* Update post list when URL changes */
                this.getPostsList();
            }
        );
    }

    /**
     * Initialize all available categories
     */
    private initCategories()
    {
        this.postService.categories
            .subscribe(json => this.categories = json);
    }

    private initTags()
    {
        this.postService.tags
            .subscribe(json => this.tags = json);
    }

    private initTopics()
    {
        this.postService.topics
            .subscribe(json => this.topics = json);
    }

    /**
     * Return user display name by given ID
     * @param $id
     */
    private getNicenameById(id)
    {
        if (!this.authors)
            return;
        
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

        for (let i = 0; i < this.posts.length; i++) {
            this.posts[i].checked = this.checkedAll;
        }
    }
    
    private isAnyPostChecked()
    {
        /* In case posts is not initialzied */
        if (!this.posts)
            return false;

        for (let i = 0; i < this.posts.length; i++) {
            if (this.posts[i].checked)
                return true;
        }
        
        return false;
    }

    /**
     * Change current table row to editable mode if double click on this
     * row is detected.
     * 
     * @param $event  - mouse double click event
     * @param i       - index of table row, starts from 0 
     */
    private fastEditing($event, i)
    {
        this.posts[i].editing = true;
    }

    /**
     * TODO: Restore this.posts[i] to old status
     * @param $event
     * @param i
     */
    private cancelFastEditing($event, i)
    {
        this.posts[i].editing = false;
    }
    
    private cancelBulkEditing($event)
    {
        this.bulkEditing = false;
    }

    private onSubmit($event, i)
    {
        this.postService.savePost(this.posts[i])
            .subscribe(
                success => {
                    this.alerts.push({type: 'success', msg: '保存成功'});
                    this.posts[i].editing = false;
                },
                error => {
                    this.alerts.push({type: 'danger', msg: '保存失败'});
                }
            );
    }

    /**
     * Toggle right panel
     */
    private toggleRightBar(str: string): void
    {
        /*
         * Initialize selected categories/tags/topics for given post
         */
        
                
        this.hideRightBar = !this.hideRightBar;
        for (let t in this.tabs) {
            this.tabs[t] = false;
        }
        // Active corresponding tab
        this.tabs[str] = true;
    }

    private applyBulkAction() {
        console.log("bulk action apply: ", this.bulkAction);
        if (this.bulkAction === 'editing') {
            this.bulkEditing = true;
            return;
        }

        if (this.bulkAction === 'deleting')
        {
            console.log("Delete selected posts");
        }
    }

    private checkCat(e: Category): void {}
    private checkTag(e: Tag): void {}
    private checkTopic(e: Topic): void {}
}