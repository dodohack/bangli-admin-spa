/**
 * Global popup alert reducer
 */
import { Action } from '@ngrx/store';

import { Alert }     from '../models';
import * as alert    from '../actions/alert';

export type AlertsState = Alert[];

export function alertsReducer(state: AlertsState = [], action: alert.Actions): AlertsState {
    switch(action.type)
    {
        case alert.SUCCESS: {
            return [...state, { type: 'success', msg: action.payload }];
        }

        case alert.INFO: {
            return [...state, { type: 'info', msg: action.payload }];
        }

        case alert.WARNING: {
            return [...state, { type: 'warning', msg: '注意: ' + action.payload }];
        }

        case alert.ERROR: {
            return [...state, { type: 'danger', msg: '错误: ' + action.payload }];
        }

        default:
            return state;
    }
}
