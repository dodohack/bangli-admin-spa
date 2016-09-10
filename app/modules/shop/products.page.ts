/**
 * This is the component for products
 */
import '@ngrx/core/add/operator/select';
import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';
import { Observable }        from 'rxjs/Observable';

import { AppState }          from '../../reducers';
import { Ping }              from '../../ping';
import { AuthState }         from '../../reducers/auth';
import { ProductsState }     from '../../reducers/products';
import { ProductActions }    from '../../actions';
import { Product }           from '../../models';
import { ProductParams }     from '../../models';
import { Category, Tag, Topic} from '../../models';
import { Brand }             from '../../models';
import { Activity }          from '../../models';
import { CmsAttrsState }     from '../../reducers/cmsattrs';
import { ShopAttrsState }    from '../../reducers/shopattrs';

import { zh_CN } from '../../localization';

@Component({ template: require('./products.page.html') })
export class ProductsPage implements OnInit, OnDestroy
{
    // All subscribers, needs to unsubscribe on destory
    subAuth: any;
    subCms: any;
    subShop: any;
    subProducts: any;
    subActivityOn: any;
    subActivityOff: any;
    subParams: any;
    subQueryParams: any;

    authState:     AuthState;
    cmsState:      CmsAttrsState;
    shopState:     ShopAttrsState;
    productsState: ProductsState;
    
    // Batch editing products
    productsInEdit: Product[];

    params: any;
    queryParams: any;

    // Is search is running
    loading: boolean;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>,
                private ping: Ping) { }

    ngOnInit() {
        this.subAuth = this.store.select<AuthState>('auth')
            .subscribe(authState => this.authState = authState);
        this.subCms = this.store.select<CmsAttrsState>('cms')
            .subscribe(cmsState => this.cmsState = cmsState);
        this.subShop = this.store.select<ShopAttrsState>('shop')
            .subscribe(shopState => this.shopState = shopState);
        this.subProducts = this.store.select<ProductsState>('products')
            .subscribe(productsState => {
                // Set search loading to false if products is loaded
                this.loading = false;
                this.productsState = productsState;
                // Create new copies of products
                this.productsInEdit = this.productsState.editing
                    .map(id => Object.assign({}, this.productsState.entities[id]));
            });

        // THIS IS A TEMPORARY FIX
        // FIXME: Previous request is cancel by the second one if exists
        // FIXME: and potential other kind of issues
        // Load products when any url parameter changes
        this.subParams = this.route.params.subscribe(params => {
            this.params = params;
            this.loading = true;
            this.loadProducts();
        });
        this.subQueryParams = this.route.queryParams.subscribe(params => {
            this.queryParams = params;
            this.loading = true;
            this.loadProducts();
        });
    }

    ngOnDestroy() {
        this.subAuth.unsubscribe();
        this.subCms.unsubscribe();
        this.subShop.unsubscribe();
        this.subProducts.unsubscribe();
        this.subParams.unsubscribe();
        this.subQueryParams.unsubscribe();
    }

    get zh() { return zh_CN.product; }

    loadProducts() {
        let productParams: ProductParams = new ProductParams;

        // Must have parameters come from route.params observable
        if (this.params) {
            productParams.cur_page = this.params['page'];
            productParams.state    = this.params['state'];
        }

        // Optional parameters come from route.queryParams observable
        if (this.queryParams) {
            productParams.editor   = this.queryParams['editor'];
            productParams.brand    = this.queryParams['brand'];
            productParams.category = this.queryParams['category'];
            productParams.datetype = this.queryParams['datetype'];
            productParams.datefrom = this.queryParams['datefrom'];
            productParams.dateto   = this.queryParams['dateto'];
            productParams.query    = this.queryParams['query'];
        }

        // Load list of products from API server
        this.store.dispatch(ProductActions.loadProducts(productParams));
    }


    // In page edit single or multiple products
    batchEdit(ids: number[]) {
        this.store.dispatch(ProductActions.batchEditProducts(ids));
    }

    // FIXME: Should be Cancel batch options
    cancelBatchEdit() {
        this.store.dispatch(ProductActions.cancelBatchEditProducts());
    }

    // Edit previous product in current products list
    editPreviousProduct() {
        this.store.dispatch(ProductActions.batchEditPreviousProduct());
    }

    // Edit next product in current products list
    editNextProduct() {
        this.store.dispatch(ProductActions.batchEditNextProduct());
    }

    // Delete multiple products
    batchDelete(ids: number[]) {
        this.store.dispatch(ProductActions.batchDeleteProducts(ids));
    }

    // Lock products to offline edit
    batchOfflineEdit(ids: number[]) {
        this.store.dispatch(ProductActions.batchOfflineEditProducts(ids));
    }

    // Add lock to products, so no one can edit the product
    batchLock(ids: number[]) {
        this.store.dispatch(ProductActions.batchLockProducts(ids));
    }

    // Get shared tags for products in editing mode
    get sharedTags() {
        if (!this.productsInEdit.length) return;

        if (this.productsInEdit.length === 1) {
            return this.productsInEdit[0].tags;
        } else {
            console.error("TODO, sharedTags");
        }
    }

    get sharedCats() {
        if (!this.productsInEdit.length) return;

        if (this.productsInEdit.length === 1) {
            return this.productsInEdit[0].categories;
        } else {
            console.error("TODO, sharedCats");
        }
    }

    get sharedTopics() {
        if (!this.productsInEdit.length) return;

        if (this.productsInEdit.length === 1) {
            return this.productsInEdit[0].topics;
        } else {
            console.error("TODO, sharedTopics");
        }
    }


    /////////////////////////////////////////////////////////////////////////
    // NOTE: Following add/remove actions are the same as single product
    // Category, tag, topic add/remove events
    selectCat(cat: Category) {
        // Unselect a category if is is previously selected, vice versa
        if (cat.checked) this.removeCat(cat.id);
        else this.addCat(cat);
    }
    addBrand(brand: Brand) {
        this.store.dispatch(ProductActions.addBrand(brand));
    }
    addCat(cat: Category) {
        this.store.dispatch(ProductActions.addCategory(cat));
    }
    addTag(tag: Tag) {
        this.store.dispatch(ProductActions.addTag(tag));
    }
    addTopic(topic: Topic) {
        this.store.dispatch(ProductActions.addTopic(topic));
    }
    removeBrand(id: number) {
        this.store.dispatch(ProductActions.removeBrand(id));
    }
    removeCat(id: number) {
        this.store.dispatch(ProductActions.removeCategory(id));
    }
    removeTag(id: number) {
        this.store.dispatch(ProductActions.removeTag(id));
    }
    removeTopic(id: number) {
        this.store.dispatch(ProductActions.removeTopic(id));
    }

    // TODO:
    canDeactivate() {
        return true;
    }

    /**
     * Get product variations
     * @param product
     */
    private variations(product)
    {
        return JSON.parse(product['variations']);
    }
}