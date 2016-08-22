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

    static AUTO_SAVE = '[Product] Auto Save';
    static autoSave(product: Product): Action {
        return {
            type: ProductActions.AUTO_SAVE,
            payload: product
        };
    }

    static SAVE = '[Product] Save';
    static save(product: Product): Action {
        return {
            type: ProductActions.SAVE,
            payload: product
        };
    }

    static BULK_SAVE = '[Product] Bulk Save';
    static bulkSave(products: Product[]): Action {
        return {
            type: ProductActions.BULK_SAVE,
            payload: products
        };
    }
}
