import { Action }         from '@ngrx/store';
import { Observable }     from 'rxjs/Observable';

import { FeMenu }         from '../models';
import * as menu          from '../actions/femenu';

export interface FeMenuGroup {
    [gid: number]: FeMenu [];
}

export interface FeMenusState {
    curTopMenuId:  number; // Current topbar menu root id, we have fixed name 'topbar'
    curMainMenuId: number; // Current main menu root id
    curFootMenuId: number; // Current footer menu root id, we have fixed name 'footer'
    rootIds: number[];     // The menus whose parent_id is 0
    parentIds: number[];   // All parent ids
    // Types and names for root menu
    roots: { [id: number]: {type: string, name: string, device: string}};
    // Array of menus grouped by parent id and group id, top level menu always
    // in group id 0
    menus: { [pid: number]: FeMenuGroup[] };
    // Corresponding group ids in array for menus, used to index menus
    menuGids: { [pid: number]: number[] };
};

const initialState: FeMenusState = {
    curTopMenuId:          0,
    curMainMenuId:         0,
    curFootMenuId:         0,
    rootIds:               [],
    parentIds:             [],
    roots:                 {},
    menus:                 {},
    menuGids:              {},
};

export default function (state = initialState, action: menu.Actions | any): FeMenusState {
    switch (action.type)
    {
        // TODO: This reduce costs several ms to dozens of ms if number of menus
        // TODO: are huge, we should always cache menu into localStorage.
        case menu.LOAD_ALL_SUCCESS: {
            const menusAry = action.payload;
            const rootMenusAry = menusAry.filter(m => m.parent_id === 0);
            const rootIds      = rootMenusAry.map(menu => menu.id);

            const parentIds    = menusAry.map(m => m.parent_id).filter(
                (elem, idx, self) => idx == self.indexOf(elem));

            const roots        = rootMenusAry.reduce(
                (roots: {[id: number]: { type: string, name: string}}, m: FeMenu) => {
                    return Object.assign(roots,
                        {[m.id]: {type: m.type, name: m.name, device: m.device}});
                }, {});


            // Generate grouped menu can be indexed by parent_id and group_id
            let menus;
            let menuGids;
            parentIds.forEach((id, idx, ids) => {
                // Turn menus with the same parent into grouped by group_id
                let groupMenus = menusAry.filter(m => m.parent_id === id)
                    .reduce((gms: FeMenuGroup, m: FeMenu) => {
                        if (gms[m.group])
                        // Add menu to existing menu group
                            return Object.assign(gms, {[m.group]: [...gms[m.group], m]});
                        else
                        // Create a new menu group with this menu
                            return Object.assign(gms, {[m.group]: [m]});
                    }, {});
                menus = Object.assign({}, menus, {[id]: groupMenus});
                menuGids = Object.assign({}, menuGids, {[id]: Object.keys(groupMenus)});

                // Sort each group of menus by ascending order
                menuGids[id].forEach((gid, idx, gids) => {
                    menus[id][gid].sort((a, b) => a.order - b.order);
                }, {});
            });

            return {
                curTopMenuId:  state.curTopMenuId,
                curMainMenuId: state.curMainMenuId,
                curFootMenuId: state.curFootMenuId,
                rootIds:       rootIds,
                parentIds:     parentIds,
                roots:         roots,
                menus:         menus,
                menuGids:      menuGids,
            };
        }

        default:
            return state;
    }
}

/*****************************************************************************
 * Helper functions
 *****************************************************************************/


export const getSubMenus = (state: FeMenusState, pid: number) => state.menus[pid];

/**
 * Return group index of submenus object
 */
export const getSubMenuGids = (state: FeMenusState, spid: number) => state.menuGids[spid];

/**
 * Return root menu ids
 */
export const getRootMenuIds = (state: FeMenusState) => state.rootIds;

/**
 * Return root menus
 */
export const getRootMenus = (state: FeMenusState) => state.roots;

/**
 * Return menu group ids
 */
export const getMenuGroupIds = (state: FeMenusState) => state.menuGids;

/**
 * Return menu parent ids
 */
export const getMenuParentIds = (state: FeMenusState) => state.parentIds;

/**
 * Return all menus
 */
export const getMenus = (state: FeMenusState) => state.menus;

// FIXME: TODO
/**
 * Return all mobile menus
 */
export const getMobileMenus = (state: FeMenusState) => state.menus;

/**
 * Return all desktop menus
 */
export const getDesktopMenus = (state: FeMenusState) => state.menus;
