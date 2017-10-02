/**
 * Action to get preconfiged frontend menu, includes:
 * mobile menus and desktop menus
 */
import { Action }       from '@ngrx/store';
import { FeMenu }       from '../models/menu';
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

    static ADD_MENU = '[Menu] Add';
    static addMenu(menu: FeMenu): Action {
        return {
            type: FeMenuActions.ADD_MENU,
            payload: menu
        };
    }

    static SAVE_MENU = '[Menu] Save';
    static saveMenu(menu: FeMenu): Action {
        return {
            type: FeMenuActions.SAVE_MENU,
            payload: menu
        };
    }

    static DELETE_MENU = '[Menu] Delete';
    static deleteMenu(menu: FeMenu): Action {
        return {
            type: FeMenuActions.DELETE_MENU,
            payload: menu
        };
    }
}
