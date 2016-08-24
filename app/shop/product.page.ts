/**
 * This is the single product edit page component
 */

import { Component, OnInit }     from '@angular/core';
import { ActivatedRoute }        from '@angular/router';
import { Store }                 from '@ngrx/store';
import { Observable }            from 'rxjs/Observable';
import { FroalaEditorCompnoent } from "ng2-froala-editor/ng2-froala-editor";
import { FROALA_OPTIONS }        from '../models/froala.option';

import { AppState, getProduct }         from '../reducers';
import { ProductActions }               from '../actions';
import { User, Product, Category, Tag } from '../models';

import { zh_CN } from '../localization';

@Component({
    template: require('./product.page.html')
})
export class ProductPage implements OnInit
{
    froalaEditor: any;
    hideRightBar = true;
    tabs = { 'cat': false, 'tag': false };

    /* Id of current product */
    id$: Observable<number>;

    /* List of products */
    products$: Observable<any>;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {
        this.products$ = this.store.select('products');
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.store.dispatch(ProductActions.loadProduct(params['id']));
        });

        this.id$ = this.route.params.select<number>('id');
    }

    get zh() { return zh_CN.product };
    /* Froala editor options */
    get froalaOptions () { return FROALA_OPTIONS; }
    //get editors() { return this.userService.editors; }
    //get categories() { return this.productService.categories; }
    //get tags()       { return this.productService.tags; }

    /* Get current product by id */
    get product$(): Observable<any> {
        return this.id$.switchMap(id => this.store.let(getProduct(id)));
    }

    /**
     * This function is somehow bugged
     * @param event
     */
    onFroalaModelChanged(event: any) {
        setTimeout(() => {
            //this.product.content = event;
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

    /*
    private initProduct()
    {
        this.route.params.subscribe(
            segment => {
                // Get product id from URL segment
                this.product.id = segment['id'] ? +segment['id'] : 0;
            }
        );

        if (this.product.id) {
            this.productService.getProduct(this.product.id).subscribe(
                product => {
                    this.product = product;
                    // Till now, categories and tags should be ready
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
    */

    /**
     * Set categories to checked status based on the value of post.categories
     */
    /*
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
    */
    private toggleRightBar(e: any): void {
        this.hideRightBar = !this.hideRightBar;
    }
}
