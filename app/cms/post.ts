/**
 * This is the single post edit page component
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';
import { ActivatedRoute, CanDeactivate }  from '@angular/router';
import { TYPEAHEAD_DIRECTIVES, TAB_DIRECTIVES, AlertComponent } from 'ng2-bootstrap';
import { FroalaEditorCompnoent } from "ng2-froala-editor/ng2-froala-editor";
import { FROALA_OPTIONS } from '../models/froala.option';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { 
    HtmlDropdownComponent, 
    EditorPageHeaderComponent, 
    CategoryTreeComponent,
    TagCloudComponent,
    TopicCloudComponent,
    PostCttCloudComponent } from '../components';

import { User, Post, Category, Tag, Topic } from '../models';
import { PostService, UserService } from '../service';

let template = require('./post.html');
@Component({
    template: template,
    directives: [
        AlertComponent,
        TAB_DIRECTIVES,
        TYPEAHEAD_DIRECTIVES,
        FroalaEditorCompnoent,
        HtmlDropdownComponent,
        EditorPageHeaderComponent,
        CategoryTreeComponent,
        TagCloudComponent,
        TopicCloudComponent,
        PostCttCloudComponent
    ],
    providers: [ PostService ]
})
export class PostPage implements OnInit
{
    /* The post we are current editing */
    post = new Post;

    froalaEditor: any;

    /* Parameters to <editor-page-header> */
    pageTitle  = "文章";
    previewUrl = "dummy";
    backUrl    = "post";
    
    authorName: string;
    editorName: string;

    /* TODO: Used to test html-dropdown.component */
    authors: User[];
    editors: User[];

    /* All post categories */
    categories: Category[];
    /* All post tags */
    tags: Tag[];
    /* All topics available to post */
    /* TODO: topic cloud should be optimized if the number is large */
    topics: Topic[];

    /* Froala editor options */
    options: any = FROALA_OPTIONS;

    hideRightBar = true;
    showFilter   = true;

    tabs = {'cat': false, 'tag': false, 'topic': false};

    alerts = Array<Object>();

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
        
        this.cleanPostDirtyMask();

        this.initAuthors();

        this.initPostId();

        this.initCategories();

        this.initTags();

        this.initTopics();

        this.initPost();
    }


    private cleanPostDirtyMask() {
        this.post.dirtyCat = false;
        this.post.dirtyTag = false;
        this.post.dirtyTopic = false;
        this.post.dirtyContent = false;
        this.post.dirtyOthers = false;
    }

    private isPostDirty() {
        return this.post.dirtyCat ||
            this.post.dirtyTag ||
            this.post.dirtyTopic ||
            this.post.dirtyContent ||
            this.post.dirtyOthers;
    }

    /**
     * Retrieve available authors and editors
     */
    private initAuthors() {
        this.userService.authors.subscribe(
            authors => {
                this.authors = authors;
                console.log("Authors: ", this.authors);
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
            .subscribe(post => {
                this.post = post;
                /* Till now, this.categories should be ready */
                if (this.post.categories)
                    this.updateCategoryCheckStatus(this.categories);
                if (this.post.tags)
                    this.updateTagCheckStatus();
                if (this.post.topics)
                    this.updateTopicCheckStatus();
            });
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
     * Set categories to checked status based on the value of post.categories
     */
    private updateCategoryCheckStatus(categories: Category[])
    {
        for (let i in categories) {
            if (categories[i].children) {
                this.updateCategoryCheckStatus(categories[i].children);
            } else {
                for (let j in this.post.categories) {
                    if (categories[i].id == this.post.categories[j].id) {
                        categories[i].checked = true;
                    }
                }
            }

        }
    }

    private updateTagCheckStatus()
    {
        for (let i in this.post.tags) {
            for (let j in this.tags) {
                if (this.post.tags[i].id == this.tags[j].id) {
                    this.tags[j].checked = true;
                    break;
                }
            }
        }
    }

    private updateTopicCheckStatus()
    {
        for (let i in this.post.topics) {
            for (let j in this.topics) {
                if (this.post.topics[i].id == this.topics[j].id) {
                    this.topics[j].checked = true;
                    break;
                }
            } 
        }
    }

    /*
    private parseTree(roots: Category[], subs: Category[]) {
        for (let s in subs) {
            let idx = 0;
            for (let r in roots) {

                if (roots[r].children) {
                    this.parseTree(roots[r].children, subs);
                }

                if (subs[s] === undefined)
                    continue;

                if (roots[r].id === subs[s].parent_id) {
                    roots[r].children = [subs[s]];
                    // Remove from the list
                    subs.splice(idx, 1);
                }

            }
            idx++;
        }

    }
    */

    /**
     * This function is somehow bugged
     * @param event
     */
    onFroalaModelChanged(event: any) {
        setTimeout(() => {
            this.post.content = event;
            this.post.dirtyContent = true;
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

    onSelectAuthor(e: any) {
        console.log("Author selected: ", e.item.nicename);
    }

    onSelectEditor(e: any) {
        console.log("Editor selected: ", e.item.nicename);
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
    /*
    private hasSubCat(id: string)
    {
        if (this.keys.indexOf(id.toString()) != -1)
            return true;
        return false;
    }
*/

    /**
     * Return a array of categories with same parentId
     * @param parentId
     */
    /*
    private subCats(parentId)
    {
        return this.categories[parentId];
    }
*/
    
    /**
     * Toggle right panel
     */
    private toggleRightBar(event): void
    {
        this.hideRightBar = !this.hideRightBar;
        for (let t in this.tabs) {
            this.tabs[t] = false;
        }
        /* Active corresponding tab */
        this.tabs[event] = true;
    }

    /**
     * Template function used by category-tree/tag-cloud/topic-cloud checkbox
     * @param e
     * @param input
     * @param dirty
     */
    private check<T>(e: T, input: Array<T>): Array<T> {

        let output = Array<T>();

        if (e['checked'])
            output = [...input, e];
        else {
            for (let i in input) {
                if (input[i]['id'] !== e['id']) {
                    output.push(input[i]);
                }
            }
        }

        return output;
    }

    /**
     * Add selected category to current post
     * @param e
     */
    private checkCat(e: Category): void {
        this.post.dirtyCat   = true;
        this.post.categories = this.check(e, this.post.categories);
    }

    /**
     * Add selected tag to current post
     * @param e
     */
    private checkTag(e: Tag): void {
        this.post.dirtyTag = true;
        this.post.tags     = this.check(e, this.post.tags);
    }

    /**
     * Add selected topic to current post
     * @param e
     */
    private checkTopic(e: Topic): void {
        this.post.dirtyTopic = true;
        this.post.topics = this.check(e, this.post.topics);
    }

    // Return true if everything is saved, else return false.
    /*
    canDeactivate()
    {
      return false;
    }
    */

    /**
     * Save the post
     */
    private save()
    {
        /* Don't trigger post if post is not dirty*/
        if (!this.isPostDirty())
            return;

        this.postService.savePost(this.post)
            .subscribe(
                success => {
                    this.alerts.push({type: 'success', msg: '保存成功'});
                    this.cleanPostDirtyMask();
                },
                error => {
                    this.alerts.push({type: 'danger', msg: '保存失败'});
                }
            );
    }

    /**
     * Change the post status to 'pending' and save it
     */
    private save2Review()
    {
        if (this.post.status != 'pending')
            this.post.dirtyOthers = true;

        this.post.status = 'pending';
        this.save();
    }

    /**
     * Change the post status to 'publish' and save it
     */
    private publish()
    {
        if (this.post.status != 'publish')
            this.post.dirtyOthers = true;

        this.post.status = 'publish';
        this.save();
    }
}
