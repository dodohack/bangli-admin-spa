/**
 * Action of getting all non cms, shop, bbs attributes.
 */
import { Action }        from '@ngrx/store';
import { SysAttrsState } from '../reducers/sysattrs';


export const LOAD_ALL = '[SysAttr] Load All';
export const LOAD_ALL_SUCCESS = '[SysAttr] Load All Success';
export const LOAD_ALL_FAIL = '[SysAttr] Load All Fail';

export class LoadAll implements Action {
    readonly type = LOAD_ALL;
    // Payload - key
    constructor(public payload: string = undefined) {}
}

export class LoadAllSuccess implements Action {
    readonly type = LOAD_ALL_SUCCESS;
    constructor(public payload: SysAttrsState) {}
}

export class LoadAllFail implements Action {
    readonly type = LOAD_ALL_FAIL;
}

export type Actions = LoadAll | LoadAllSuccess | LoadAllFail;
