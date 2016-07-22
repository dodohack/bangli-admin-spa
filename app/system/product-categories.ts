/**
 * Shop product category management component
 */
import { Component, OnInit }    from '@angular/core';
import { Title }                from '@angular/platform-browser';

import { ProductService }       from '../service/product.service';

@Component({
    templateUrl: 'app/system/product-categories.html',
    providers: [ProductService]
})
export class ProductCategoriesPage implements OnInit
{
    /* All product categories */
    categories: any;
    /* Root categories */
    roots: any;
    /* Indices of categories, indicate how many groups of cats we have */
    indices: any;

    constructor(private productService: ProductService,
                private titleService: Title) {}

    ngOnInit()
    {
        this.titleService.setTitle('商品分类 - 葫芦娃');

        this.createProductCategories();
    }

    private createProductCategories()
    {
        this.productService.getCategories().subscribe(
            json  => {
                this.categories = json;
                this.roots = this.categories[0];
                this.indices = Object.keys(this.categories);
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
        if (this.indices.indexOf(id.toString()) != -1)
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
}