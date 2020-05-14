import { Params } from '@angular/router';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { Alert, IAlert } from '../alerts/alert.model';
import { AlertAction, GetAlertsSuccessAction, SearchAlertsSuccessAction, SelectAlertAction } from './actions';

export interface IRouterState {
    url: string;
    queryParams: Params;
    params: Params;
    path: string;
}
export interface IPanelState<T> {
    masterList: T[];
    filteredList: T[];
    detail: T;
}
export interface IAlertsState extends IPanelState<IAlert> {
    masterList: Alert[];
    filteredList: Alert[];
    detail: Alert;
}
export interface IStoreState {
    router: RouterReducerState<IRouterState>;
    alerts: IAlertsState;
}

const initialAlertsState: IAlertsState = {
    masterList: undefined,
    filteredList: undefined,
    detail: undefined
};
const initialState: IStoreState = {
    router: { state: null, navigationId: null },
    alerts: initialAlertsState
};

export function alertsReducer(state = initialAlertsState, action: AlertAction): IAlertsState {
    switch (action.type) {
        case GetAlertsSuccessAction.TYPE:
            return {
                ...state,
                masterList: (<GetAlertsSuccessAction>action).payload
            };
        case SelectAlertAction.TYPE:
            return {
                ...state,
                detail: (<SelectAlertAction>action).payload
            };
        case SearchAlertsSuccessAction.TYPE:
            return {
                ...state,
                filteredList: (<SearchAlertsSuccessAction>action).payload
            };
        default: return state;
    }
}

export const reducers: ActionReducerMap<IStoreState> = {
    router: routerReducer,
    alerts: alertsReducer
};

export const metaReducers: MetaReducer<IStoreState>[] = !environment.production ? [] : [];
