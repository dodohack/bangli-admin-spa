/**
 * Global popup alert reducer
 */
import * as alert    from '../actions/alert';

export interface AlertsState {
    type: string;
    msg: string;
}

const initState: AlertsState = {
    type: null,
    msg: null,
};

export function alertsReducer(state: AlertsState = initState, action: alert.Actions): AlertsState {
    switch(action.type)
    {

        case alert.INFO: {
            return { type: 'info', msg: action.payload };
        }

        case alert.ERROR: {
            return { type: 'error', msg: action.payload };
        }

        default:
            return state;
    }
}

export const getAlertType = (state: AlertsState) => state.type;
export const getAlertMsg  = (state: AlertsState) => state.msg;