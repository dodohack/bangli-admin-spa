/**
 * This is the single product edit page component
 */

import { Component }             from '@angular/core';
import { OnInit, OnDestroy }     from '@angular/core';
import { ViewChild }             from '@angular/core';
import { ActivatedRoute }        from '@angular/router';
import { Store }                 from '@ngrx/store';


import { AppState, getProduct }  from '../../reducers';
import { ProductActions }        from '../../actions';
import { ProductsState }         from '../../reducers/products';
import { AuthState }             from '../../reducers/auth';
import { CmsAttrsState }         from '../../reducers/cmsattrs';
import { ShopAttrsState }        from "../../reducers/shopattrs";
import { AlertActions }          from "../../actions";

import { FroalaOptions }         from '../../models/froala.option';
import { Product }               from '../../models';
import { Category }              from '../../models';
import { Tag }                   from '../../models';
import { Brand }                 from '../../models';
import { zh_CN }                 from '../../localization';


@Component({ template: require('./product.page.html') })
export class ProductPage implements OnInit, OnDestroy
{
    @ViewChild('productForm') productForm;

    // subscriptions
    subAuth: any;
    subCms: any;
    subShop: any;
    subProducts: any;
    subParams: any;


    authState:     AuthState;
    cmsState:      CmsAttrsState;
    shopState:     ShopAttrsState;
    productsState: ProductsState;

    // Current product, inputProduct is only used to initialize forala editor,
    // cause it is bugged when both input/output model are the same
    inputProduct: Product;
    product: Product;

    froalaEditor: any;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) {}

    ngOnInit() {
        this.subAuth = this.store.select<AuthState>('auth')
            .subscribe(authState => this.authState = authState);
        this.subCms = this.store.select<CmsAttrsState>('cms')
            .subscribe(cmsState => this.cmsState = cmsState);
        this.subShop = this.store.select<ShopAttrsState>('shop')
            .subscribe(shopState => this.shopState = shopState);

        // Dispatch an action to create or load a product
        this.dispatchLoadProduct();
        // Load the product
        this.loadProduct();
    }

    ngOnDestroy() {
        this.subAuth.unsubscribe();
        this.subCms.unsubscribe();
        this.subShop.unsubscribe();
        this.subProducts.unsubscribe();
        this.subParams.unsubscribe();
    }


    /**
     * Kick an action to load the product when URL changes
     */
    dispatchLoadProduct() {
        this.subParams = this.route.params.subscribe(params => {
            if (Object.keys(params).length === 0) // New a product
                this.store.dispatch(ProductActions.newProduct(/* FIXME: current user id */));
            else                                  // Edit a product
                this.store.dispatch(ProductActions.loadProduct(+params['id']));
        });
    }

    /**
     * Listen on ngrx/store, create a post from 'store' if state is changed
     */
    loadProduct() {
        this.subProducts = this.store.select<ProductsState>('products')
            .subscribe(ps => {
                this.productsState = ps;
                // When opening a single product, 'editing' always contains 1 id
                // FIXME: Remove inputProudct after updating to new angular2-froala binding
                this.inputProduct = ps.entities[ps.editing[0]];
                this.product = Object.assign({}, this.inputProduct);
            });
    }

    canDeactivate() {
        console.log("form status: ", this.productForm);
        if (this.productForm.dirty) {
            this.store.dispatch(AlertActions.error('请先保存当前更改，或取消保存'));
            return false;
        } else {
            return true;
        }
    }



    get isDraft()   { return this.product.state === 'draft'; }
    get isPending() { return this.product.state === 'pending'; }
    get isPublish() { return this.product.state === 'publish'; }
    get myId() { return this.authState.users[this.authState.key].id; }

    get zh() { return zh_CN.product };
    get froalaOptions () { return FroalaOptions.getDefault(); }


    productContentChanged($event) {
        // If no timeout set, the editor will throw an exception
        setTimeout(() => {
            console.log("Product content changed!");
            this.product.content = $event;
        });
    }

    // Category, tag, topic add/remove events
    selectCat(cat: Category) {
        // Unselect a category if is is previously selected, vice versa
        if (cat.checked) this.removeCat(cat.id);
        else this.addCat(cat);
    }
    addCat(cat: Category) {
        this.store.dispatch(ProductActions.addCategory(cat));
    }
    addTag(tag: Tag) {
        this.store.dispatch(ProductActions.addTag(tag));
    }
    removeCat(id: number) {
        this.store.dispatch(ProductActions.removeCategory(id));
    }
    removeTag(id: number) {
        this.store.dispatch(ProductActions.removeTag(id));
    }


    // Restore current content to given revision
    restoreRevision(rid: number) {
        this.store.dispatch(ProductActions.applyRevision([this.product.id, rid]));
        this.store.dispatch(AlertActions.warning('请确认版本恢复正确后点击保存到服务器'));
    }

    // TODO: Need to get back a save success status and enable canDeactivate
    // TODO: We can listen on 'alerts' changes, if a successful alert is
    // back with the id, type of current post, we can say enable
    // canDeactivate
    save() {
        this.store.dispatch(ProductActions.saveProduct(this.product));
    }
    save2Pending() { this.product.state = 'pending'; this.save(); }
    save2Draft()   { this.product.state = 'draft';   this.save(); }
    save2Publish() { this.product.state = 'publish'; this.save(); }
}
