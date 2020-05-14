import { Action } from '@ngrx/store';
import { Alert } from '../alerts/alert.model';

export abstract class TypedAction implements Action {
    static readonly TYPE: string;
    readonly type: string = (<typeof TypedAction>this.constructor).TYPE;
}

const ActionTypes = {
    GET_ALERTS: 'Get Alerts',
    GET_ALERTS_SUCCESS: 'Get Alerts Success',
    SEARCH_ALERTS: 'Search Alerts',
    SEARCH_ALERTS_SUCCESS: 'Search Alerts Success',
    SELECT_ALERT: 'Select Alert',
    SELECT_ALERT_SUCCESS: 'Select Alert Success'
};

export class GetAlertsAction extends TypedAction {
    static readonly TYPE: string = ActionTypes.GET_ALERTS;
    constructor(public payload?: void) { super(); }
}

export class GetAlertsSuccessAction extends TypedAction {
    static readonly TYPE: string = ActionTypes.GET_ALERTS_SUCCESS;
    constructor(public payload: Alert[]) { super(); }
}

export class SearchAlertsAction extends TypedAction {
    static readonly TYPE: string = ActionTypes.SEARCH_ALERTS;
    constructor(public payload: string) { super(); }
}

export class SearchAlertsSuccessAction extends TypedAction {
    static readonly TYPE: string = ActionTypes.SEARCH_ALERTS_SUCCESS;
    constructor(public payload: Alert[]) { super(); }
}

export class SelectAlertAction extends TypedAction {
    static readonly TYPE: string = ActionTypes.SELECT_ALERT;
    constructor(public payload: Alert) { super(); }
}

export class SelectAlertSuccessAction extends TypedAction {
    static readonly TYPE: string = ActionTypes.SELECT_ALERT_SUCCESS;
    constructor(public payload: Alert) { super(); }
}

export type AlertAction = GetAlertsAction
                        | GetAlertsSuccessAction
                        | SearchAlertsAction
                        | SearchAlertsSuccessAction
                        | SelectAlertAction
                        | SelectAlertSuccessAction;
