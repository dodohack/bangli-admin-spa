/**
 * Actions of user preferences management
 */
import { Action }     from '@ngrx/store';
import { Menu }       from "../models";
import { Preference } from "../models";

export const TOGGLE_SIDEBAR = '[Preference] Toggle Sidebar';
export const CHANGE_MENU_BACKGROUND = '[Preference] Change Menu Background';
export const CHANGE_MENU_COLOR = '[Preference] Change Menu Color';
export const SET_LIST_ITEM_COUNT = '[Preference] Set List Item Count';
export const TOGGLE_RICH_LIST = '[Preference] Toggle Rich List';
export const ADD_TOPBAR_MENU = '[Preference] Add Topbar Menu';
export const REMOVE_TOPBAR_MENU = '[Preference] Remove Topbar Menu';
export const ADD_SIDEBAR_MENU = '[Preference] Add Sidebar Menu';
export const REMOVE_SIDEBAR_MENU = '[Preference] Remove Sidebar Menu';
export const SAVE = '[Preference] Save';

export class ToggleSidebar implements Action {
    readonly type = TOGGLE_SIDEBAR;
}

export class ChangeMenuBackground implements Action {
    readonly type = CHANGE_MENU_BACKGROUND;
    // Payload - color
    constructor(public payload: string) {}
}

export class ChangeMenuColor implements Action {
    readonly type = CHANGE_MENU_COLOR;
    constructor(public payload: string) {}
}

export class SetListItemCount implements Action {
    readonly type = SET_LIST_ITEM_COUNT;
    constructor(public payload: number) {}
}

export class ToggleRichList implements Action {
    readonly type = TOGGLE_RICH_LIST;
}

export class AddTopbarMenu implements Action {
    readonly type = ADD_TOPBAR_MENU;
    constructor(public payload: Menu) {}
}

export class RemoveTopbarMenu implements Action {
    readonly type = REMOVE_TOPBAR_MENU;
    constructor(public payload: Menu) {}
}

export class AddSidebarMenu implements Action {
    readonly type = ADD_SIDEBAR_MENU;
    constructor(public payload: Menu) {}
}

export class RemoveSidebarMenu implements Action {
    readonly type = REMOVE_SIDEBAR_MENU;
    constructor(public payload: Menu) {}
}

export class Save implements Action {
    readonly type = SAVE;
    constructor(public payload: Preference) {}
}

export type Actions = ToggleSidebar
| ChangeMenuBackground
| ChangeMenuColor
| SetListItemCount
| ToggleRichList
| AddTopbarMenu
| RemoveTopbarMenu
| AddSidebarMenu
| RemoveSidebarMenu
| Save;

