/**
 * Action to show alert at fixed position(bottom left).
 */
import { Action } from '@ngrx/store';

export const SUCCESS = '[Alert] Success';
export const INFO    = '[Alert] Info';
export const WARNING = '[Alert] Warning';
export const ERROR   = '[Alert] Error';

export class Success implements Action {
    readonly type = SUCCESS;
    constructor(public payload: string) {}
}

export class Info implements Action {
    readonly type = INFO;
    constructor(public payload: string) {}
}

export class Warning implements Action {
    readonly type = WARNING;
    constructor(public payload: string) {}
}
export class Error implements Action {
    readonly type = ERROR;
    constructor(public payload: string) {}
}

export type Actions = Success
    | Info
    | Warning
    | Error;
