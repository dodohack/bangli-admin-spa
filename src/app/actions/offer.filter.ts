/**
 * Offer filters
 */
import { Action }      from '@ngrx/store';
import { OfferFilter } from '../models';

export const NEW =  '[OfferFilter] New';
export const SAVE = '[OfferFilter] Save';
export const LOAD = '[OfferFilter] Load';
export const LOAD_ALL = '[OfferFilter] Load All';
export const SAVE_SUCCESS = '[OfferFilter] Save Success';
export const LOAD_SUCCESS = '[OfferFilter] Load Success';
export const LOAD_ALL_SUCCESS = '[OfferFilter] Load All Success';
export const SAVE_FAIL = '[OfferFilter] Save Fail';
export const LOAD_FAIL = '[OfferFilter] Load Fail';

export class New implements Action {
    readonly type = NEW;
    constructor(public payload: OfferFilter) {}
}

export class Save implements Action {
    readonly type = SAVE;
    constructor(public payload: {ftype: string, data: string}) {}
}

export class Load implements Action {
    readonly type = LOAD;
    // Payload: filter type
    constructor(public payload: string) {}
}

export class LoadAll implements Action {
    readonly type = LOAD_ALL;
}

export class SaveSuccess implements Action {
    readonly type = SAVE_SUCCESS;
    // Payload - returned OfferFilter record
    constructor(public payload: OfferFilter) {}
}

export class SaveFail implements Action {
    readonly type = SAVE_FAIL;
    // Payload - error code or message etc
    constructor(public payload: any) {}
}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;
    // Payload - returned OfferFilter record
    constructor(public payload: OfferFilter) {}
}

export class LoadAllSuccess implements Action {
    readonly type = LOAD_ALL_SUCCESS;
    // Payload - returned filter type and filter content
    constructor(public payload: OfferFilter[]) {}
}

export class LoadFail implements Action {
    readonly type = LOAD_FAIL;
    // Payload - error code or message etc
    constructor(public payload: any) {}
}

export type Actions = New
    | Save
    | Load
    | LoadAll
    | SaveSuccess
    | LoadSuccess
    | LoadAllSuccess
    | SaveFail
    | LoadFail;
