import { Component, Injector, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { GetAlertsAction, SearchAlertsAction, SelectAlertAction } from 'src/app/store/actions';
import { IStoreState } from 'src/app/store/reducers';
import { AlertsDetailOutletComponent } from '../modes/component-outlet/alerts-detail-outlet.component';
import { AlertsGridOutletComponent } from '../modes/component-outlet/alerts-grid-outlet.component';
import { Alert } from './alert.model';
import { AlertsDetailComponent } from './alerts-detail.component';
import { AlertsGridHeaderComponent } from './alerts-grid-header.component';
import { AlertsGridRowComponent } from './alerts-grid-row.component';

@Component({
    selector: 'app-alerts',
    templateUrl: './alerts.component.html'
})
export class AlertsComponent implements OnInit {

    GridRowComponent = AlertsGridRowComponent;
    GridHeaderComponent = AlertsGridHeaderComponent;
    DetailComponent = AlertsDetailComponent;
    OutletDetailComponent = AlertsDetailOutletComponent;
    OutletGridComponent = AlertsGridOutletComponent;

    alertInjector: Injector;
    mode: string = 'dynamicComponent';

    alerts$ = this._store.select('alerts', 'filteredList');
    selectedAlert$ = this._store.select('alerts', 'detail');

    selectAlert: Subject<Alert> = new Subject<Alert>();

    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private _store: Store<IStoreState>, private _injector: Injector) { }

    ngOnInit() {
        this.alertInjector = Injector.create({
            providers: [{
                provide: 'filteredList$',
                useFactory: (store: Store<IStoreState>) => store.select('alerts', 'filteredList'),
                deps: [Store]
            }, {
                provide: 'detail$',
                useFactory: (store: Store<IStoreState>) => store.select('alerts', 'detail'),
                deps: [Store]
            }, {
                provide: 'selectItem',
                useValue: (item) => this._store.dispatch(new SelectAlertAction(item))
            }],
            parent: this._injector
        });


        // make sure master list is initialized
        this._store.select('alerts', 'masterList')
            .pipe(
                take(1),
                filter(masterList => !masterList)
            )
            .subscribe(() => {
                this._store.dispatch(new GetAlertsAction());
            });

        this.selectAlert
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe(alert => {
                this._store.dispatch(new SelectAlertAction(alert));
            });
    }

    ngOnDestroy(): void {
        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

    search(searchText: string): void {
        this._store.dispatch(new SearchAlertsAction(searchText));
    }

}
