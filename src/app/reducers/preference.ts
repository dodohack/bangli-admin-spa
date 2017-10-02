/**
 * User preference reducer
 */
import { Action } from '@ngrx/store';

import { Preference } from '../models';
import * as pref      from '../actions/preference';


export type PreferenceState = Preference;
const initialState: PreferenceState = {
    isIconSidebar: false,
    listItemCount: 20,
    isRichList: false,
    menuColor: '#FFFFFF',
    menuBackgroundColor: '#383838',
    myTopbarMenus: [],
    mySidebarMenus: []
}

export function prefReducer(state = initialState, action: pref.Actions | any): PreferenceState {
    switch (action.type)
    {
        case pref.TOGGLE_SIDEBAR: {
            return Object.assign({}, state, {
                isIconSidebar: !state.isIconSidebar
            });
        }

        case pref.CHANGE_MENU_BACKGROUND: {
            return Object.assign({}, state, {
                menuBackgroundColor: action.payload
            });
        }

        case pref.CHANGE_MENU_COLOR: {
            return Object.assign({}, state, {
                menuColor: action.payload
            });
        }
            
        case pref.SET_LIST_ITEM_COUNT: {
            return Object.assign({}, state, {
                listItemCount: action.payload
            });
        }
            
        case pref.TOGGLE_RICH_LIST: {
            return Object.assign({}, state, {
                isRichList: !state.isRichList
            });
        }
            
        case pref.ADD_TOPBAR_MENU: {
            return Object.assign({}, state, {
                myTopbarMenus: [...state.myTopbarMenus, action.payload]
            });

        }
            
        case pref.REMOVE_TOPBAR_MENU: {
            return Object.assign({}, state, {
                myTopbarMenus: state.myTopbarMenus.filter(
                    menu => menu.url != action.payload.url
                )
            });
        }
            
        case pref.ADD_SIDEBAR_MENU: {
            return Object.assign({}, state, {
               mySidebarMenus: [...state.mySidebarMenus, action.payload]
            });
        }
            
        case pref.REMOVE_SIDEBAR_MENU: {
            return Object.assign({}, state, {
               mySidebarMenus: state.mySidebarMenus.filter(
                   menu => menu.url != action.payload.url
               )
            });
        }
            
        case pref.SAVE: {
            return Object.assign({}, action.payload);
        }

        default:
            return state;
    }
}
