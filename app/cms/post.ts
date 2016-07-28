/**
 * This is the single post edit page component
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';
import { ActivatedRoute, CanDeactivate }  from '@angular/router';
import { TAB_DIRECTIVES } from 'ng2-bootstrap';
import { FroalaEditorCompnoent } from "ng2-froala-editor/ng2-froala-editor";
import { FROALA_OPTIONS } from '../models/froala.option';

import { HtmlDropdownComponent, EditorPageHeaderComponent } from '../components';

import { User, Post, Category, Tag, Topic } from '../models';
import { PostService, UserService } from '../service';

// FIXME: Remove 'forEach', as it is 10x slower than 'for'
import forEach = require("core-js/fn/array/for-each");

let template = require('./post.html');
@Component({
    template: template,
    directives: [
        TAB_DIRECTIVES,
        FroalaEditorCompnoent,
        HtmlDropdownComponent,
        EditorPageHeaderComponent
    ],
    providers: [ PostService ]
})
export class PostPage implements OnInit//, CanDeactivate
{
    /* The post we are current editing */
    post = new Post;

    froalaEditor: any;

    /* Parameters to <editor-page-header> */
    pageTitle  = "文章";
    previewUrl = "dummy";
    backUrl    = "post";

    /* TODO: Used to test html-dropdown.component */
    authors: User[];
    editors: User[];

    /* All product categories */
    categories: any;
    /* Root categories */
    roots: any;
    keys: any;

    /* Froala editor options */
    options: any = FROALA_OPTIONS;

    hideRightBar = true;

    constructor(private route: ActivatedRoute,
                private userService: UserService,
                private postService: PostService,
                private titleService: Title) {
    }

    clearSelection() : void {
        this.post.author_id = null;
        this.post.editor_id = null;
    }

    ngOnInit() {
        this.titleService.setTitle('编辑文章 - 葫芦娃');

        this.initAuthors();

        this.initPostId();

        this.initPost();

        this.initPostCategories();
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

    /**
     * Post ID should be available before initializing a post
     */
    private initPostId() {
        this.route.params.subscribe(
            segment => {
                /* Get post id from URL segment */
                this.post.id = segment['id'] ? +segment['id'] : 0;
            }
        );
    }

    /**
     * Initialize the post, only when we have a valid id
     */
    private initPost()
    {
        if (!this.post.id)
            return;

        this.postService.getPost(this.post.id)
            .subscribe(post => this.post = post);
    }

    /**
     * Initialize all available categories
     */
    private initPostCategories()
    {
        this.postService.categories.subscribe(
            json  => {
                this.categories = json;
                this.roots = this.categories[0];
                //console.log(this.categories);
                this.keys = Object.keys(this.categories);
            },
            error => console.error(error)
        );
    }

    /**
     * This function is somehow bugged
     * @param event
     */
    onFroalaModelChanged(event: any) {
        setTimeout(() => {
            this.post.content = event;
            console.log("onFroalaModelChanged");
        });
    }

    onEditorInitialized(event?: any) {
        console.log("onEditorInitialized");
        this.froalaEditor = FroalaEditorCompnoent.getFroalaInstance();
        this.froalaEditor.on('froalaEditor.focus', (e, editor) => {
            console.log("editor is focused");
        });
    }

    /**
     * Filter post categories for matched user input 
     */
    private filterPostCategories(str: string)
    {
        /*
        this.postService.categories.map(
            res => {
                let parentIds = [];
                this.keys = Object.keys(res);

                // loop over 'parent_id' grouped categories
                this.keys.forEach(function(key) {
                    let cats = res[key];

                    let length = cats.length;

                    for (let j = 0; j < length; j++) {
                        // Default to hide everything
                        cats[j].hidden = true;
                        if (cats[j].name.includes(str) ||
                            cats[j].slug.includes(str)) {
                            // Show matched search
                            cats[j].hidden = false;
                            // Also record the parent id, so we don't hide parent list
                            parentIds.push(cats[j].parent_id);
                        }
                    }
                });

                // Do not hide parent if children is not hidden
                this.keys.forEach(function(key){
                    let cats = res[key];
                    let length = cats.length;

                    for (let j = 0; j < length; j++) {
                        // Check if we can find the parent id that should not be hidden
                        if (parentIds.indexOf(cats[j].id) != -1) {
                            cats[j].hidden = false;
                        }
                    }
                });

                console.log("FILTERED RESULT: ");
                console.log(res);
                return res;
            })
            .subscribe(
                json  => {
                    this.categories = json;
                    this.roots = this.categories[0];
                    this.keys  = Object.keys(this.categories);
                    //console.log(this.categories);
                },
                error => console.error(error)
            );
         */
    }

    /**
     * If given category id has a sub category
     * @param id
     */
    private hasSubCat(id: string)
    {
        if (this.keys.indexOf(id.toString()) != -1)
            return true;
        return false;
    }


    /**
     * Return a array of categories with same parentId
     * @param parentId
     */
    private subCats(parentId)
    {
        return this.categories[parentId];
    }

    /**
     * Toggle right panel
     */
    private toggleRightBar(): void
    {
        this.hideRightBar = !this.hideRightBar;
    }

    /**
     * Remove category from current post
     * @param e
     */
    private removeCat(e: Category): void
    {
        let i = this.post.categories.indexOf(e);
        this.post.categories.splice(i, 1);
    }

    /**
     * Remove topic from current post
     * @param e
     */
    private removeTopic(e: Topic): void
    {
        let i = this.post.topics.indexOf(e);
        this.post.topics.splice(i, 1);
    }

    /**
     * Remove tag from current post
     * @param e
     */
    private removeTag(e: Tag): void
    {
        let i = this.post.tags.indexOf(e);
        this.post.tags.splice(i, 1);
    }

    // Return true if everything is saved, else return false.
    /*
    canDeactivate()
    {
      return false;
    }
    */
}
