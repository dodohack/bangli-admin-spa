/**
 * This is the post list management page component
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Pagination }  from '../datatype/pagination';
import { PostType }    from '../datatype/posttype';
import { PostStatus }  from '../datatype/poststatus';

import { PostService } from '../service/post.service';


@Component({
    templateUrl: 'app/cms/posts.html',
    providers: [PostService]
})
export class PostsPage implements OnInit
{   
    /* Pagination related variables of the list */
    pagination = new Pagination(0, 1, 0, 0, 0, 0, 0, 0, 0);

    /* PostType for editors */
    postType = new PostType;

    /* PostStatus */
    postStatus = new PostStatus;

    /* Posts filters: any, author, editor, status */
    filter: any;
    condition: any;

    /* The list of posts, array */
    posts: any;

    /* The menu of this page */
    menus: any;
    /* Authors object */
    authors: any;
    numAuthors: number;
    /* Editors object */
    editors: any;
    numEditors: number;
    /* Categories object */
    categories: any;
    /* Post status object */
    status: any;

    /* Checkbox group for selected posts */
    checkedAll: boolean = false;

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

        this.getPostsMenu();

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
            json  => {
                this.menus = json;
                this.authors = json['authors'];
                this.editors = json['editors'];
                this.categories = json['categories'];
                this.status = json['status'];
                this.numAuthors = this.authors.length;
                this.numEditors = this.editors.length;
                console.log(this.authors);
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
        for (let i = 0; i < this.numAuthors; i++) {
            if (this.authors[i].id == id)
                return this.authors[i].nicename;
        }
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
            this.posts[i].editing = false;
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
        console.log("double clicked detected: " + i);
        console.log($event);
    }
}