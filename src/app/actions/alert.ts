/**
 * Action to show alert at fixed position(bottom left).
 */
import { Action } from '@ngrx/store';

export const INFO    = '[Alert] Info';
export const ERROR   = '[Alert] Error';

export class Info implements Action {
    readonly type = INFO;
    constructor(public payload: string) {}
}

export class Error implements Action {
    readonly type = ERROR;
    constructor(public payload: string) {}
}

export type Actions = Info | Error;
