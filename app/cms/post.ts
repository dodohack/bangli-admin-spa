/**
 * This is the single post edit page component
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';
import { ActivatedRoute }    from '@angular/router';
import { FroalaEditorCompnoent } from "ng2-froala-editor/ng2-froala-editor";

import { HtmlDropdownComponent } from '../components/html-dropdown.component';
import { PostService } from '../service/post.service';

// FIXME: Remove 'forEach', as it is 10x slower than 'for'
import forEach = require("core-js/fn/array/for-each");

// TODO: Move this into folder models
interface Author {
    id: number;
    name: string;
    avatar: string;
}

@Component({
    templateUrl: 'app/cms/post.html',
    directives: [FroalaEditorCompnoent, HtmlDropdownComponent],
    providers: [PostService]
})
export class PostPage implements OnInit
{
    id: number = 0;
    title: string;
    text: string;
    editor: any;
    hideRightBar: boolean = true;

    /* TODO: Used to test html-dropdown.component */
    authors: Author[];
    author: Author;

    /* All product categories */
    categories: any;
    /* Root categories */
    roots: any;
    keys: any;

    options: any = {
        /* Past in WYSIWYG edit in plain text */
        pastePlain: true,

        /* Editor height in pixel */
        height: 600,

        /* Toolbars */
        toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline',
            'fontSize', 'color',
            'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent',
            'indent', 'insertHR', 'insertLink',
            'insertImage', 'insertVideo', 'insertFile',
            'insertTable', 'undo', 'redo', 'clearFormatting', 'html'],

        toolbarSticky: false,

        /* Language */
        language: 'zh_cn'
    };

    constructor(private route: ActivatedRoute,
                private postService: PostService,
                private titleService: Title) {
        this.author = null;
        this.authors = [
            {
                id: 1,
                name: "Joanna",
                avatar: "joanna-avatar.jpg"
            },
            {
                id: 2,
                name: "Kim",
                avatar: "kim-avatar.jpg"
            },
            {
                id: 3,
                name: "Sarah",
                avatar: "sarah-avatar.jpg"
            }
        ];
    }

    clearSelection() : void {
        this.author = null;
    }

    ngOnInit() {
        this.titleService.setTitle('编辑文章 - 葫芦娃');

        this.route.params.subscribe(
            segment => {
                /* Get post id from URL segment */
                console.log("Post::ngOnInit called");
                this.id = segment['id'] ? +segment['id'] : 0;
            }
        );

        /* Initialze editor content */
        this.initPost();

        /* Initial categories */
        this.initPostCategories();
    }

    /**
     * This function is somehow bugged
     * @param event
     */
    onFroalaModelChanged(event: any) {
        setTimeout(() => {
            this.text = event;
            console.log("onFroalaModelChanged");
        });
    }

    onEditorInitialized(event?: any) {
        console.log("onEditorInitialized");
        this.editor = FroalaEditorCompnoent.getFroalaInstance();
        this.editor.on('froalaEditor.focus', (e, editor) => {
            console.log("editor is focused");
        });
    }

    /**
     * Initial the post, only when we have a valid id
     */
    private initPost()
    {
        if (!this.id)
            return;

        this.postService.getPost(this.id).subscribe(
            json => {
                this.title = json['title'];
                this.text  = json['content'];
            }
        )
    }

    private initPostCategories()
    {
        this.postService.getCategories().subscribe(
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
     * Filter post categories for matched user input 
     */
    private filterPostCategories(str: string)
    {
        this.postService.getCategories()
            .map(res => {
                let parentIds = [];
                this.keys = Object.keys(res);

                /* loop over 'parent_id' grouped categories */
                this.keys.forEach(function(key) {
                    let cats = res[key];

                    let length = cats.length;

                    for (let j = 0; j < length; j++) {
                        /* Default to hide everything */
                        cats[j].hidden = true;
                        if (cats[j].name.includes(str) ||
                            cats[j].slug.includes(str)) {
                            /* Show matched search */
                            cats[j].hidden = false;
                            /* Also record the parent id, so we don't hide parent list */
                            parentIds.push(cats[j].parent_id);
                        }
                    }
                });

                /* Do not hide parent if children is not hidden */
                this.keys.forEach(function(key){
                    let cats = res[key];
                    let length = cats.length;

                    for (let j = 0; j < length; j++) {
                        /* Check if we can find the parent id that should not be hidden */
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

    private toggleRightBar(e: any): void 
    {
        this.hideRightBar = !this.hideRightBar;
    }

}
