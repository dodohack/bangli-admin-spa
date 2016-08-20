/**
 * User preference reducer
 */
import { Action } from '@ngrx/store';

import { PreferenceActions } from '../actions';
import { Preference }        from '../models';

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

export default function(state = initialState, action: Action): PreferenceState {
    switch (action.type)
    {
        case PreferenceActions.TOGGLE_SIDEBAR: {
            return Object.assign({}, state, {
                isIconSidebar: !state.isIconSidebar
            });
        }

        case PreferenceActions.CHANGE_MENU_BACKGROUND: {
            return Object.assign({}, state, {
                menuBackgroundColor: action.payload
            });
        }

        case PreferenceActions.CHANGE_MENU_COLOR: {
            return Object.assign({}, state, {
                menuColor: action.payload
            });
        }
            
        case PreferenceActions.SET_LIST_ITEM_COUNT: {
            return Object.assign({}, state, {
                listItemCount: action.payload
            });
        }
            
        case PreferenceActions.TOGGLE_RICH_LIST: {
            return Object.assign({}, state, {
                isRichList: !state.isRichList
            });
        }
            
        case PreferenceActions.ADD_TOPBAR_MENU: {
            return Object.assign({}, state, {
                myTopbarMenus: [...state.myTopbarMenus, action.payload]
            });

        }
            
        case PreferenceActions.REMOVE_TOPBAR_MENU: {
            return Object.assign({}, state, {
                myTopbarMenus: state.myTopbarMenus.filter(
                    menu => menu.url != action.payload.url
                )
            });
        }
            
        case PreferenceActions.ADD_SIDEBAR_MENU: {
            return Object.assign({}, state, {
               mySidebarMenus: [...state.mySidebarMenus, action.payload]
            });
        }
            
        case PreferenceActions.REMOVE_SIDEBAR_MENU: {
            return Object.assign({}, state, {
               mySidebarMenus: state.mySidebarMenus.filter(
                   menu => menu.url != action.payload.url
               )
            });
        }

        default:
            return state;
    }
}
