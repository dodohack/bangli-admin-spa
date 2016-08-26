import { Action }  from '@ngrx/store';
import { Deal } from '../models';

export class DealActions {
    static SEARCH = '[Deal] Search';
    static search(query: string): Action {
        return {
            type: DealActions.SEARCH,
            payload: query
        };
    }

    static SEARCH_COMPLETE = '[Deal] Search Complete';
    static searchComplete(results: Deal[]): Action {
        return {
            type: DealActions.SEARCH_COMPLETE,
            payload: results
        };
    }

    static LOAD_DEALS = '[Deal] Load Deals';
    static loadDeals(filters:any): Action {
        return {
            type: DealActions.LOAD_DEALS,
            payload: filters
        };
    }

    static LOAD_DEALS_SUCCESS = '[Deal] Load Deals Success';
    static loadDealsSuccess(deals: Deal[]): Action {
        return {
            type: DealActions.LOAD_DEALS_SUCCESS,
            payload: deals
        };
    }

    static LOAD_DEALS_FAIL = '[Deal] Load Deals Fail';
    static loadDealsFail(): Action {
        return {
            type: DealActions.LOAD_DEALS_FAIL,
        };
    }

    static LOAD_DEAL = '[Deal] Load Deal';
    static loadDeal(id: number): Action {
        return {
            type: DealActions.LOAD_DEAL,
            payload: id
        };
    }

    static LOAD_DEAL_SUCCESS = '[Deal] Load Deal Success';
    static loadDealSuccess(deal: Deal): Action {
        return {
            type: DealActions.LOAD_DEAL_SUCCESS,
            payload: deal
        };
    }

    static LOAD_DEAL_FAIL = '[Deal] Load Deal Fail';
    static loadDealFail(): Action {
        return {
            type: DealActions.LOAD_DEAL_FAIL,
        };
    }

    static AUTO_SAVE = '[Deal] Auto Save';
    static autoSave(deal: Deal): Action {
        return {
            type: DealActions.AUTO_SAVE,
            payload: deal
        };
    }

    static SAVE_DEAL = '[Deal] Save Deal';
    static saveDeal(deal: Deal): Action {
        return {
            type: DealActions.SAVE_DEAL,
            payload: deal
        };
    }

    static SAVE_DEAL_SUCCESS = '[Deal] Save Deal Success';
    static saveDealSuccess(): Action {
        return {
            type: DealActions.SAVE_DEAL_SUCCESS
        };
    }

    static SAVE_DEAL_FAIL = '[Deal] Save Deal Fail';
    static saveDealFail(): Action {
        return {
            type: DealActions.SAVE_DEAL_FAIL
        };
    }

    static SAVE_DEALS = '[Deal] Save Deals';
    static saveDeals(deals: Deal[]): Action {
        return {
            type: DealActions.SAVE_DEALS,
            payload: deals
        };
    }
}