import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, withLatestFrom, filter, debounceTime } from 'rxjs/operators';
import { includes } from 'lodash';
import { IStoreState } from './reducers';
import { GetAlertsAction, GetAlertsSuccessAction, SearchAlertsAction, SearchAlertsSuccessAction } from './actions';
import { mockAlerts } from 'src/mockData/mockAlerts';
import { Alert } from '../alerts/alert.model';

@Injectable()
export class AlertEffects {
    @Effect()
    getAlertList$: any = this.actions$.pipe(
        ofType(GetAlertsAction.TYPE),
        map(() => {
            const masterList = mockAlerts.map(dto => new Alert(dto));
            return new GetAlertsSuccessAction(masterList);
        })
    );

    @Effect()
    searchAlerts$: any = this.actions$.pipe(
        ofType(SearchAlertsAction.TYPE),
        map((action: SearchAlertsAction) => action.payload && action.payload.toLowerCase()),
        withLatestFrom(this._store.select('alerts', 'masterList')),
        filter(([filterText, masterList]) => !!masterList),
        map(([filterText, masterList]) => {
            const filteredList = masterList.filter(alert => {
                return alert.name.toLowerCase().indexOf(filterText) !== -1;
            });
            return new SearchAlertsSuccessAction(filteredList);
        })
    );

    constructor(private actions$: Actions, private _store: Store<IStoreState>) { }
}