import { Action }  from '@ngrx/store';
import { Product } from '../models';

export class ProductActions {
    static SEARCH = '[Product] Search';
    static search(query: string): Action {
        return {
            type: ProductActions.SEARCH,
            payload: query
        };
    }

    static SEARCH_COMPLETE = '[Product] Search Complete';
    static searchComplete(results: Product[]): Action {
        return {
            type: ProductActions.SEARCH_COMPLETE,
            payload: results
        };
    }

    static LOAD_PRODUCTS = '[Product] Load Products';
    static loadProducts(filters: any): Action {
        return {
            type: ProductActions.LOAD_PRODUCTS,
            payload: filters
        };
    }

    static LOAD_PRODUCTS_SUCCESS = '[Product] Load Products Success';
    static loadProductsSuccess(products: Product[]): Action {
        return {
            type: ProductActions.LOAD_PRODUCTS_SUCCESS,
            payload: products
        };
    }

    static LOAD_PRODUCTS_FAIL = '[Product] Load Products Fail';
    static loadProductsFail(): Action {
        return {
            type: ProductActions.LOAD_PRODUCTS_FAIL,
        };
    }

    static LOAD_PRODUCT = '[Product] Load Product';
    static loadProduct(id: string): Action {
        return {
            type: ProductActions.LOAD_PRODUCT,
            payload: id
        };
    }

    static LOAD_PRODUCT_SUCCESS = '[Product] Load Product Success';
    static loadProductSuccess(product: Product): Action {
        return {
            type: ProductActions.LOAD_PRODUCT_SUCCESS,
            payload: product
        };
    }

    static LOAD_PRODUCT_FAIL = '[Product] Load Product Fail';
    static loadProductFail(): Action {
        return {
            type: ProductActions.LOAD_PRODUCT_FAIL,
        };
    }

    static AUTO_SAVE = '[Product] Auto Save';
    static autoSave(product: Product): Action {
        return {
            type: ProductActions.AUTO_SAVE,
            payload: product
        };
    }

    static SAVE_PRODUCT = '[Product] Save Product';
    static saveProduct(product: Product): Action {
        return {
            type: ProductActions.SAVE_PRODUCT,
            payload: product
        };
    }

    static SAVE_PRODUCTS = '[Product] Save Products';
    static saveProducts(products: Product[]): Action {
        return {
            type: ProductActions.SAVE_PRODUCTS,
            payload: products
        };
    }
}
