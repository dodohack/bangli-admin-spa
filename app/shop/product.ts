/**
 * This is the single product edit page component
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';
import { ActivatedRoute }    from '@angular/router';
import { FroalaEditorCompnoent } from "ng2-froala-editor/ng2-froala-editor";

import { ProductService } from '../service/product.service';

@Component({
    templateUrl: 'app/shop/product.html',
    directives: [FroalaEditorCompnoent],
    providers: [ProductService]
})
export class ProductPage implements OnInit
{
    id: number;
    title: string;
    text: string;
    editor: any;
    guid: string;
    hideRightBar: boolean = true;

    /* All product categories */
    categories: any;
    /* Root categories */
    roots: any;
    /* Indices of categories, indicate how many groups of cats we have */
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
                private productService: ProductService,
                private titleService: Title) {}

    ngOnInit() {
        this.titleService.setTitle('编辑商品 - 葫芦娃');

        this.route.params.subscribe(
            segment => {
                /* Get product id from URL segment */
                this.id = segment['id'] ? +segment['id'] : 0;
                if (this.id > 0) {
                    /* Initialze editor content */
                    this.initProduct();
                }
            }
        );


        /* Initial categories */
        this.createProductCategories();
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

    private initProduct()
    {
        this.productService.getProduct(this.id).subscribe(
            json => {
                this.title = json['title'];
                this.text  = json['content'];
                this.guid  = json['guid'];
            }
        )
    }

    private createProductCategories()
    {
        this.productService.getCategories().subscribe(
            json  => {
                this.categories = json;
                this.roots = this.categories[0];
                this.keys = Object.keys(this.categories);
            },
            error => console.error(error)
        );
    }

    /**
     * Filter product categories for matched user input
     */
    private filterProductCategories(str: string)
    {
        this.productService.getCategories()
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
                            console.log("SEARCHING: " + str + ", from name: " + cats[j].name + cats[j].slug);
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
                            console.log("Changing " + cats[j].name + " to display");
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

    private toggleRightBar(e: any): void {
        this.hideRightBar = !this.hideRightBar;
    }
}
