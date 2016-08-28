/**
 * Action to get CMS attributes, includes:
 * authors, editors, categories, tags, topic_cats, status, post_types etc
 */
import { Action }          from '@ngrx/store';
import { AuthState }       from '../reducers/auth';
import { CmsAttrsState }   from '../reducers/cmsattrs';

export class CmsAttrActions {
    static LOAD_ALL = '[CmsAttr] Load All';
    static loadAll(auth: AuthState): Action {
        return {
            type: CmsAttrActions.LOAD_ALL,
            payload: auth
        };
    }

    static LOAD_ALL_SUCCESS = '[CmsAttr] Load All Success';
    static loadAllSuccess(attr: CmsAttrsState): Action {
        return {
            type: CmsAttrActions.LOAD_ALL_SUCCESS,
            payload: attr
        };
    }

    static LOAD_ALL_FAIL = '[CmsAttr] Load All Fail';
    static loadAllFail(): Action {
        return {
            type: CmsAttrActions.LOAD_ALL_FAIL
        };
    }
}
