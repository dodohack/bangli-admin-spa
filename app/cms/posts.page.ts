/**
 * This is the post list management page component
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { TAB_DIRECTIVES, AlertComponent } from 'ng2-bootstrap';

import { PostService, UserService } from '../service';
import { User, Post, Category, Tag, Topic,
    Pagination, PostStatus } from '../models';

import { zh_CN } from '../localization';

@Component({
    template: require('./posts.html')
})
export class PostsPage implements OnInit
{   
    /* Parameter to <list-page-menu> */
    baseUrl = 'post/list';
    /* Parameter to <paginator> */
    deepUrl: string;

    /* Posts filters: any, author, editor, status */
    filter: any;
    condition: any;

    /* The list of posts, array */
    posts: Post[];

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

    pagination = new Pagination;

    constructor(private route: ActivatedRoute,
                private userService: UserService,
                private postService: PostService) {}

    ngOnInit()
    {
        this.initPostsList();
    }

    /* Localization, have to wrapper it as template only access 
     * component local methods/properties */
    get zh() { return zh_CN.post; }
    get authors() { return this.userService.authors; }
    get editors() { return this.userService.editors; }

    get statuses()   { return this.postService.statuses; }
    get categories() { return this.postService.categories; }
    get tags()       { return this.postService.tags; }
    get topics()     { return this.postService.topics; }

    private initPostsList()
    {
        /* Get URL segments and update the list */
        this.route.params.subscribe(
            segment => {
                this.filter = segment['filter'] ? segment['filter'] : 'all';
                this.condition = segment['cond'] ? segment['cond'] : 'all';
                this.deepUrl = this.baseUrl + '/' + this.filter + '/' + this.condition;
                /* '+' magically converts string to number */
                this.pagination.current_page = segment['page'] ? +segment['page'] : 1;
                /* Update post list when URL changes */
                this.getPostsList();
            }
        );
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
                if (this.authors[i].display_name == null)
                    return this.authors[i].name;
                else
                    return this.authors[i].display_name;
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