/**
 * Actions of user preferences management
 */
import { Action } from '@ngrx/store';
import { Menu }   from "../models";

export class PreferenceActions {
    static TOGGLE_SIDEBAR = '[Preference] Toggle Sidebar';
    static toggleSidebar() {
        return { type: PreferenceActions.TOGGLE_SIDEBAR };
    }

    static CHANGE_MENU_BACKGROUND = '[Preference] Change Menu Background';
    static changeMenuBackground(color: string) {
        return { type: PreferenceActions.CHANGE_MENU_BACKGROUND, payload: color };
    }

    static CHANGE_MENU_COLOR = '[Preference] Change Menu Color';
    static changeMenuColor(color: string) {
        return { type: PreferenceActions.CHANGE_MENU_COLOR, payload: color };
    }

    static SET_LIST_ITEM_COUNT = '[Preference] Set List Item Count';
    static setListItemCount(count: number) {
        return { type: PreferenceActions.SET_LIST_ITEM_COUNT, payload: count };
    }
    
    static TOGGLE_RICH_LIST = '[Preference] Toggle Rich List';
    static toggleRichList() {
        return { type: PreferenceActions.TOGGLE_RICH_LIST };
    }
    
    static ADD_TOPBAR_MENU = '[Preference] Add Topbar Menu';
    static addTopbarMenu(menu: Menu) {
        return { type: PreferenceActions.ADD_TOPBAR_MENU, payload: menu };
    }

    static REMOVE_TOPBAR_MENU = '[Preference] Remove Topbar Menu';
    static removeTopbarMenu(menu: Menu) {
        return { type: PreferenceActions.REMOVE_TOPBAR_MENU, payload: menu };
    }
    
    static ADD_SIDEBAR_MENU = '[Preference] Add Sidebar Menu';
    static addSidebarMenu(menu: Menu) {
        return { type: PreferenceActions.ADD_SIDEBAR_MENU, payload: menu };
    }

    static REMOVE_SIDEBAR_MENU = '[Preference] Remove Sidebar Menu';
    static removeSidebarMenu(menu: Menu) {
        return { type: PreferenceActions.REMOVE_SIDEBAR_MENU, payload: menu };
    }    
}