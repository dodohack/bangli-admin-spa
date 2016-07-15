/**
 * This is the post list management page component
 */

import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

import { Pagination }  from '../datatype/pagination';
import { PostService } from '../service/post.service';

@Component({
    templateUrl: 'app/cms/posts.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [PostService]
})
export class PostsPage implements OnInit
{   
    /* Pagination related variables of the list */
    pagination = new Pagination(0, 1, 0, 0, 0, 0, 0, 0, 0);

    /* Posts filters: any, author, editor, status */
    filter: any;
    condition: any;

    /* The list of users, array */
    posts: any;

    /* The menu of this page */
    menus: any;

    constructor(private route: ActivatedRoute,
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

    public getAuthors() {

    }

    public getEditors() {

    }

    public getStatus() {

    }

    public getPostTypes()
    {

    }

    public getPostCategories()
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
                error => console.error(error)
            );
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
}