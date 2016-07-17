/**
 * This is the post list management page component
 */

import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

import { Pagination }  from '../datatype/pagination';
import { PostType }    from '../datatype/posttype';
import { PostService } from '../service/post.service';
import { UserService } from '../service/user.service';

@Component({
    templateUrl: 'app/cms/posts.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [PostService]
})
export class PostsPage implements OnInit
{   
    /* Pagination related variables of the list */
    pagination = new Pagination(0, 1, 0, 0, 0, 0, 0, 0, 0);

    /* PostType for editors */
    postType = new PostType;

    /* Posts filters: any, author, editor, status */
    filter: any;
    condition: any;

    /* The list of users, array */
    posts: any;

    /* The menu of this page */
    menus: any;

    /* Author/Editor/Mgr/Admin by role */
    people: any;
    /* Author/Editor/Mgr/Admin by id */
    peopleById: any;
    /* Author by id */
    authors: any;
    /* Editor by id */
    editors: any;

    /* Checkbox group for selected posts */
    checkedAll: boolean = false;

    constructor(private route: ActivatedRoute,
                private userService: UserService,
                private postService: PostService) {}

    /**
     * Initialize the page, we should only put DI initializition into ctor.
     * If no role/page is setting from URL segment, we will display the first
     * page of all customers by default.
     */
    ngOnInit()
    {
        this.pagination.current_page = 1;
        this.pagination.per_page = this.postService.getPostsPerPage();

        //this.getPostsMenu();

        /* Get author/editor/etc */
        /* TODO: As this kind of data is available globally, we can move
         * TODO: the subscribe to service layer, so that we only have network
         * TODO: access once.
         */
        this.userService.authors.subscribe(
            people => {
                /*
                 * TODO: regroup authors to multiple form:
                 * 1. object index by id used to get author/editor nicename
                 *    efficiently
                 * 2. Divide into author group and editor/shop_mgr/admin group
                 *    so we can use these 2 groups as filters.
                 */
                this.people = people;
            },
            error => console.error(error)
        );

        /* Get URL segments and update user list */
        this.route.params.subscribe(
            segment => {
                this.filter = segment['filter'] ? segment['filter'] : 'any';
                this.condition = segment['cond'] ? segment['cond'] : 'any';
                /* '+' magically converts string to number */
                this.pagination.current_page = segment['page'] ? +segment['page'] : 1;
                /* Update user list when URL changes */
                this.getPostsList();
            }
        );
    }

    /**
     * Get posts list page menu
     */
    private getPostsMenu()
    {
        this.postService.getPostsMenu().subscribe(
            json  => this.menus = json,
            error => console.error(error)
        );
    }

    /**
     * Return user display name by given ID
     * @param $id
     */
    public getNicenameById(id)
    {
        /* Loop over different group of users(admin, manager, editor, author) */
        for (let group in this.people) {
            /* Loop over users in each group */
            for (let idx in this.people[group]) {
                if (this.people[group][idx].id == id)
                    return this.people[group][idx].nicename;
            }
        }
    }

    public getAuthors() {

    }

    public getEditors() {

    }

    public getStatus() {

    }

    public getPostTypes()
    {

    }

    /**
     * Get a list of users
     */
    private getPostsList()
    {
        this.postService.getPosts(this.filter, this.condition,
                                  this.pagination.current_page)
            .subscribe(
                json => {
                    /* '+' magically converts string to number */
                    this.pagination.total = +json['total'];
                    this.pagination.per_page = +json['per_page'];
                    this.pagination.current_page = +json['current_page'];
                    this.pagination.last_page = +json['last_page'];
                    this.pagination.from = +json['from'];
                    this.pagination.to = +json['to'];
                    this.posts = json['data'];

                    this.pagination.pre_page =
                        this.pagination.current_page > 1 ?
                        this.pagination.current_page - 1 : this.pagination.current_page;
                    this.pagination.next_page =
                        this.pagination.current_page < this.pagination.last_page ?
                        this.pagination.current_page + 1 : this.pagination.last_page;
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

    private initCheckbox() {
        let length = this.posts.length;
        for (let i = 0; i < length; i++) {
            this.posts[i].checked = false;
        }
    }

    /**
     * Set number of users displayed per list
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
    
}