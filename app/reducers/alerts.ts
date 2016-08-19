/**
 * Global popup alert reducer
 */
import { Action } from '@ngrx/store';

import { Alert }        from '../models';
import { AlertActions } from '../actions';

export type AlertsState = Alert[];

export default function(state: AlertsState = [], action: Action): AlertsState {
    switch(action.type)
    {
        case AlertActions.SUCCESS: {
            return [...state, { type: 'success', msg: action.payload }];
        }

        case AlertActions.INFO: {
            return [...state, { type: 'info', msg: action.payload }];
        }

        case AlertActions.WARNING: {
            return [...state, { type: 'warning', msg: '注意: ' + action.payload }];
        }

        case AlertActions.ERROR: {
            return [...state, { type: 'danger', msg: '错误: ' + action.payload }];
        }

        default:
            return state;
    }
}
