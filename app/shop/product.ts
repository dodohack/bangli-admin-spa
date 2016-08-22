/**
 * This is the single product edit page component
 */

import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';
import { ActivatedRoute }    from '@angular/router';
import { FroalaEditorCompnoent } from "ng2-froala-editor/ng2-froala-editor";
import { FROALA_OPTIONS } from '../models/froala.option';
import { Observable } from 'rxjs/Observable';

import { User, Product, Category, Tag } from '../models';
import { ProductService, UserService } from '../service';
import { zh_CN } from '../localization';

@Component({
    template: require('./product.html')
})
export class ProductPage implements OnInit
{
    froalaEditor: any;
    
    product = new Product;

    hideRightBar = true;
    tabs = { 'cat': false, 'tag': false };
    
    alerts = Array<Object>();
    
    constructor(private route: ActivatedRoute,
                private userService: UserService,
                private productService: ProductService,
                private titleService: Title) {}

    ngOnInit() {
        this.titleService.setTitle('编辑商品 - 葫芦娃');
        this.initProduct();
    }

    get zh() { return zh_CN.product };
    /* Froala editor options */
    get froalaOptions () { return FROALA_OPTIONS; }
    get editors() { return this.userService.editors; }
    get categories() { return this.productService.categories; }
    get tags()       { return this.productService.tags; }

    /**
     * This function is somehow bugged
     * @param event
     */
    onFroalaModelChanged(event: any) {
        setTimeout(() => {
            this.product.content = event;
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

    private initProduct()
    {
        this.route.params.subscribe(
            segment => {
                /* Get product id from URL segment */
                this.product.id = segment['id'] ? +segment['id'] : 0;
            }
        );

        if (this.product.id) {
            this.productService.getProduct(this.product.id).subscribe(
                product => {
                    this.product = product;
                    /* Till now, categories and tags should be ready */
                    if (this.product.categories)
                        this.updateCategoryCheckStatus(this.categories);
                    if (this.product.tags)
                        this.updateTagCheckStatus();
                }
            )
        } else {
            // TODO: Create a new product
        }
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
                for (let j in this.product.categories) {
                    if (categories[i].id == this.product.categories[j].id) {
                        categories[i].checked = true;
                    }
                }
            }

        }
    }

    private updateTagCheckStatus()
    {
        for (let i in this.product.tags) {
            for (let j in this.tags) {
                if (this.product.tags[i].id == this.tags[j].id) {
                    this.tags[j].checked = true;
                    break;
                }
            }
        }
    }

    private toggleRightBar(e: any): void {
        this.hideRightBar = !this.hideRightBar;
    }
}
