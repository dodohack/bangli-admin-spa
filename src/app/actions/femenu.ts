/**
 * Action to get preconfiged frontend menu, includes:
 * mobile menus and desktop menus
 */
import { Action }       from '@ngrx/store';
import { FeMenu }       from '../models/menu';
import { FeMenusState } from '../reducers/femenus';

export const LOAD_ALL = '[Menu] Load All Menu';
export const LOAD_ALL_SUCCESS = '[Menu] Load All Success';
export const LOAD_ALL_FAIL = '[Menu] Load All Fail';
export const ADD_MENU = '[Menu] Add';
export const SAVE_MENU = '[Menu] Save';
export const DELETE_MENU = '[Menu] Delete';

export class LoadAll implements Action {
    readonly type = LOAD_ALL;
}

export class LoadAllSuccess implements Action {
    readonly type = LOAD_ALL_SUCCESS;
    constructor(public payload: FeMenusState) {}
}

export class LoadAllFail implements Action {
    readonly type = LOAD_ALL_FAIL;
}

export class AddMenu implements Action {
    readonly type = ADD_MENU;
    constructor(public payload: FeMenu) {}
}

export class SaveMenu implements Action {
    readonly type = SAVE_MENU;
    constructor(public payload: FeMenu) {}
}

export class DeleteMenu implements Action {
    readonly type = DELETE_MENU;
    constructor(public payload: FeMenu) {}
}

export type Actions = LoadAll
| LoadAllSuccess
| LoadAllFail
| AddMenu
| SaveMenu
| DeleteMenu;
