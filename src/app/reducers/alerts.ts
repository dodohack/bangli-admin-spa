/**
 * Global popup alert reducer
 */
import * as alert    from '../actions/alert';

export interface AlertsState {
    alert: {
        type: string,   // Type of message
        count: number,  // Just a counter, changes every time
        msg: string     // Alert message
    };
}

const initState: AlertsState = {
    alert: { type: 'info', count: 0, msg: 'Welcome' }
};

export function alertsReducer(state: AlertsState = initState, action: alert.Actions): AlertsState {
    switch(action.type)
    {
        case alert.INFO: {
            return { alert: { type: 'info', count: state.alert.count+1, msg: action.payload }};
        }

        case alert.ERROR: {
            return { alert: { type: 'error', count: state.alert.count+1, msg: action.payload }};
        }

        default:
            return state;
    }
}

export const getAlert = (state: AlertsState) => state.alert;
