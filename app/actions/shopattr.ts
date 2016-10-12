/**
 * Action to get Shop attributes, includes:
 * product categories, tags, brands, states etc
 */
import { Action }          from '@ngrx/store';
import { AuthState }       from '../reducers/auth';
import { ShopAttrsState }  from '../reducers/shopattrs';

export class ShopAttrActions {
    static LOAD_ALL = '[ShopAttr] Load All';
    static loadAll(): Action {
        return { type: ShopAttrActions.LOAD_ALL };
    }

    static LOAD_ALL_SUCCESS = '[ShopAttr] Load All Success';
    static loadAllSuccess(attr: ShopAttrsState): Action {
        return {
            type: ShopAttrActions.LOAD_ALL_SUCCESS,
            payload: attr
        };
    }

    static LOAD_ALL_FAIL = '[ShopAttr] Load All Fail';
    static loadAllFail(): Action {
        return {
            type: ShopAttrActions.LOAD_ALL_FAIL
        };
    }
}
