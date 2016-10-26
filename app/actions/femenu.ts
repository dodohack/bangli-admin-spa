/**
 * Action to get preconfiged frontend menu, includes:
 * mobile menus and desktop menus
 */
import { Action }       from '@ngrx/store';
import { FeMenusState } from '../reducers/femenus';

export class FeMenuActions {
    static LOAD_ALL = '[Menu] Load All Menu';
    static loadAll(): Action {
        return {
            type: FeMenuActions.LOAD_ALL
        };
    }

    static LOAD_ALL_SUCCESS = '[Menu] Load All Success';
    static loadAllSuccess(menus: FeMenusState): Action {
        return {
            type: FeMenuActions.LOAD_ALL_SUCCESS,
            payload: menus
        };
    }

    static LOAD_ALL_FAIL = '[Menu] Load All Fail';
    static loadAllFail(): Action {
        return {
            type: FeMenuActions.LOAD_ALL_FAIL
        };
    }
}
