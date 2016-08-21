/**
 * Action to show alert at fixed position(bottom left).
 */
export class AlertActions {
    static SUCCESS = '[Alert] Success';
    static success(msg: string) {
        return { type: AlertActions.SUCCESS, payload: msg }
    }

    static INFO    = '[Alert] Info';
    static info(msg: string) {
        return { type: AlertActions.INFO, payload: msg }
    }

    static WARNING = '[Alert] Warning';
    static warning(msg: string) {
        return { type: AlertActions.WARNING, payload: msg }
    }
    
    static ERROR   = '[Alert] Error';
    static error(msg: string) {
        return { type: AlertActions.ERROR, payload: msg }
    }
}
