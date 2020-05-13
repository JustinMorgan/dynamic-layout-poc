import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { AlertAction, GetAlertsSuccessAction, SelectAlertAction, SearchAlertsSuccessAction } from './actions';
import { Alert, IAlert } from '../alerts/alert.model';

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
    alerts: IAlertsState;
}

const initialAlertsState: IAlertsState = {
    masterList: undefined,
    filteredList: undefined,
    detail: undefined
}
const initialState: IStoreState = {
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
    alerts: alertsReducer
};

export const metaReducers: MetaReducer<IStoreState>[] = !environment.production ? [] : [];
