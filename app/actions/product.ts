import { Action }        from '@ngrx/store';
import { Activity }      from '../models';
import { ProductParams } from '../models';
import { Product }       from '../models';
import { Category }      from "../models";
import { Tag }           from "../models";
import { Topic }         from "../models";
import { Brand }         from "../models";

export class ProductActions {
    static SEARCH = '[Product] Search';
    static search(params: ProductParams): Action {
        return {
            type: ProductActions.SEARCH,
            payload: params
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
    static loadProducts(params: ProductParams): Action {
        return {
            type: ProductActions.LOAD_PRODUCTS,
            payload: params
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

    static BATCH_EDIT_PRODUCTS = '[Product] Batch Edit Products';
    static batchEditProducts(ids: number[]): Action {
        return {
            type: ProductActions.BATCH_EDIT_PRODUCTS,
            payload: ids
        };
    }

    static CANCEL_BATCH_EDIT_PRODUCTS = '[Product] Cancel Batch Edit Products';
    static cancelBatchEditProducts(): Action {
        return {
            type: ProductActions.CANCEL_BATCH_EDIT_PRODUCTS
        };
    }

    static BATCH_DELETE_PRODUCTS = '[Product] Batch Delete Products';
    static batchDeleteProducts(ids: number[]): Action {
        return {
            type: ProductActions.BATCH_DELETE_PRODUCTS,
            payload: ids
        };
    }

    static BATCH_OFFLINE_EDIT_PRODUCTS = '[Product] Batch Offline Edit Products';
    static batchOfflineEditProducts(ids: number[]): Action {
        return {
            type: ProductActions.BATCH_OFFLINE_EDIT_PRODUCTS,
            payload: ids
        };
    }

    static BATCH_LOCK_PRODUCTS = '[Product] Batch Lock Products';
    static batchLockProducts(ids: number[]): Action {
        return {
            type: ProductActions.BATCH_LOCK_PRODUCTS,
            payload: ids
        };
    }

    static BATCH_EDIT_PREVIOUS_PRODUCT = '[Product] Batch Edit Previous Product';
    static batchEditPreviousProduct(): Action {
        return {
            type: ProductActions.BATCH_EDIT_PREVIOUS_PRODUCT
        };
    }

    static BATCH_EDIT_NEXT_PRODUCT = '[Product] Batch Edit Next Product';
    static batchEditNextProduct(): Action {
        return {
            type: ProductActions.BATCH_EDIT_NEXT_PRODUCT
        };
    }

    static NEW_PRODUCT = '[Product] New Product';
    static newProduct(): Action {
        return {
            type: ProductActions.NEW_PRODUCT
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

    static APPLY_REVISION = '[Product] Apply Revision';
    static applyRevision(ids: number[]): Action {
        return {
            type: ProductActions.APPLY_REVISION,
            payload: ids
        };
    }

    static SAVE_PRODUCT_SUCCESS = '[Product] Save Product Success';
    static saveProductSuccess(product: Product): Action {
        return {
            type: ProductActions.SAVE_PRODUCT_SUCCESS,
            payload: product
        };
    }

    static SAVE_PRODUCT_FAIL = '[Product] Save Product Fail';
    static saveProductFail(): Action {
        return {
            type: ProductActions.SAVE_PRODUCT_FAIL
        };
    }


    static SAVE_PRODUCTS = '[Product] Save Products';
    static saveProducts(products: Product[]): Action {
        return {
            type: ProductActions.SAVE_PRODUCTS,
            payload: products
        };
    }

    static ADD_BRAND = '[Product] Add Brand';
    static addBrand(brand: Brand): Action {
        return {
            type: ProductActions.ADD_BRAND,
            payload: brand
        };
    }
    
    static ADD_CATEGORY = '[Product] Add Category';
    static addCategory(cat: Category): Action {
        return {
            type: ProductActions.ADD_CATEGORY,
            payload: cat
        };
    }

    static ADD_TAG = '[Product] Add Tag';
    static addTag(tag: Tag): Action {
        return {
            type: ProductActions.ADD_TAG,
            payload: tag
        };
    }

    static ADD_TOPIC = '[Product] Add Topic';
    static addTopic(topic: Topic): Action {
        return {
            type: ProductActions.ADD_TOPIC,
            payload: topic
        }
    }

    static REMOVE_BRAND = '[Product] Remove Brand';
    static removeBrand(brand_id: number): Action {
        return {
            type: ProductActions.REMOVE_BRAND,
            payload: brand_id
        };
    }

    static REMOVE_CATEGORY = '[Product] Remove Category';
    static removeCategory(cat_id: number): Action {
        return {
            type: ProductActions.REMOVE_CATEGORY,
            payload: cat_id
        };
    }

    static REMOVE_TAG = '[Product] Remove Tag';
    static removeTag(tag_id: number): Action {
        return {
            type: ProductActions.REMOVE_TAG,
            payload: tag_id
        };
    }

    static REMOVE_TOPIC = '[Product] Remove Topic';
    static removeTopic(topic_id: number): Action {
        return {
            type: ProductActions.REMOVE_TOPIC,
            payload: topic_id
        }
    }

    static REFRESH_ACTIVITY_STATUS = '[Product] Refresh Activity Status';
    static refreshActivityStatus(activities: Activity[]): Action {
        return {
            type: ProductActions.REFRESH_ACTIVITY_STATUS,
            payload: activities
        };
    }
}
