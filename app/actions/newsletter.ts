import { Action }     from '@ngrx/store';
import { Newsletter } from '../models';

export class NewsletterActions {
    static SEARCH = '[Newsletter] Search';
    static search(query: string): Action {
        return {
            type: NewsletterActions.SEARCH,
            payload: query
        };
    }

    static SEARCH_COMPLETE = '[Newsletter] Search Complete';
    static searchComplete(results: Newsletter[]): Action {
        return {
            type: NewsletterActions.SEARCH_COMPLETE,
            payload: results
        };
    }

    static LOAD_NEWSLETTERS = '[Newsletter] Load Newsletters';
    static loadNewsletters(filters: any): Action {
        return {
            type: NewsletterActions.LOAD_NEWSLETTERS,
            payload: filters
        };
    }

    static LOAD_NEWSLETTERS_SUCCESS = '[Newsletter] Load Newsletters Success';
    static loadNewslettersSuccess(products: Newsletter[]): Action {
        return {
            type: NewsletterActions.LOAD_NEWSLETTERS_SUCCESS,
            payload: products
        };
    }

    static LOAD_NEWSLETTERS_FAIL = '[Newsletter] Load Products Fail';
    static loadNewslettersFail(): Action {
        return {
            type: NewsletterActions.LOAD_NEWSLETTERS_FAIL,
        };
    }
}