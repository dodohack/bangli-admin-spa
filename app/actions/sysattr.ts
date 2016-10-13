/**
 * Action of getting all non cms, shop, bbs attributes.
 */
import { Action }        from '@ngrx/store';
import { SysAttrsState } from '../reducers/sysattrs';

export class SysAttrActions {
    
    static LOAD_ALL = '[SysAttr] Load All';
    static loadAll(key: string = undefined): Action {
        return { 
            type: SysAttrActions.LOAD_ALL,
            payload: key
        };
    }

    static LOAD_ALL_SUCCESS = '[SysAttr] Load All Success';
    static loadAllSuccess(attr: SysAttrsState): Action {
        return {
            type: SysAttrActions.LOAD_ALL_SUCCESS,
            payload: attr
        };
    }

    static LOAD_ALL_FAIL = '[SysAttr] Load All Fail';
    static loadAllFail(): Action {
        return {
            type: SysAttrActions.LOAD_ALL_FAIL
        };
    }
}