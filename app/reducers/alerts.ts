/**
 * Global popup alert reducer
 */
import { Action } from '@ngrx/store';

import { Alert }        from '../models';
import { AlertActions } from '../actions';

export type AlertState = Alert;

const initialState: AlertState = {
    showing: false,
    type: '',
    msg: ''
};

export default function(state = initialState, action: Action): AlertState {
    switch(action.type)
    {
        case AlertActions.SUCCESS: {
            return Object.assign({}, {
                showing: true, type: 'success', msg: action.payload
            });
        }

        case AlertActions.INFO: {
            console.log("Reduce AlertActioins.INFO");
            return Object.assign({}, {
                showing: true, type: 'info', msg: action.payload
            });
        }

        case AlertActions.WARNING: {
            return Object.assign({}, {
                showing: true, type: 'warning', msg: action.payload
            });
        }

        case AlertActions.ERROR: {
            return Object.assign({}, {
                showing: true, type: 'danger', msg: action.payload
            });
        }

        default:
            return state;
    }
}
