import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, map, take, takeUntil, withLatestFrom } from 'rxjs/operators';
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
export class AlertsComponent implements OnInit, OnDestroy {

    GridRowComponent = AlertsGridRowComponent;
    GridHeaderComponent = AlertsGridHeaderComponent;
    DetailComponent = AlertsDetailComponent;
    OutletDetailComponent = AlertsDetailOutletComponent;
    OutletGridComponent = AlertsGridOutletComponent;

    modes = Object.entries({
        'Dynamic components': 'dynamicComponent',
        'Component outlet': 'componentOutlet',
        'Plain inheritance': 'inheritance',
        'Dynamic template URLs (WIP)': 'dynamicTemplate',
        ngContent: 'ngContent'
    });

    alertInjector: Injector;
    mode: string;
    select: Subject<Alert | void> = new Subject<Alert | void>();

    baseTemplateUrl = '../view-templates/alerts/';

    alerts$ = this._store.select('alerts', 'filteredList');
    selectedAlert$ = this._store.select('alerts', 'detail');
    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private _store: Store<IStoreState>,
                private _injector: Injector,
                private _router: Router) { }

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
                provide: 'select$',
                useValue: this.select
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

        this.select
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe((alert: Alert | undefined) => {
                this._store.dispatch(new SelectAlertAction(alert));
            });

        this._store.select('router', 'state', 'params', 'mode')
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe(mode => {
                this.mode = mode;
            });

        // == instead of === is intentional because params are always strings
        this._store.select('router', 'state', 'params', 'selection')
            .pipe(
                takeUntil(this._ngUnsubscribe),
                withLatestFrom(
                    this._store.select('alerts', 'detail'),
                    this._store.select('alerts', 'masterList')
                ),
                filter(([selection, detail]) => selection != (detail && detail.id)),
                map(([selection, , masterList]) => masterList.find(alert => alert.id == selection))
            )
            .subscribe(alert => {
                this.select.next(alert);
            });

        this._store.select('alerts', 'detail')
            .pipe(
                takeUntil(this._ngUnsubscribe),
                withLatestFrom(this._store.select('router', 'state', 'params', 'selection')),
                filter(([detail, selection]) => selection != (detail && detail.id)),
                map(([detail]) => {
                    return detail
                        ? ['alerts', this.mode, detail.id]
                        : ['alerts', this.mode];
                })
            )
            .subscribe(routes => {
                this._router.navigate(routes);
            });

    }

    ngOnDestroy(): void {
        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

    search(searchText: string): void {
        this._store.dispatch(new SearchAlertsAction(searchText));
    }

    setMode(mode: string): void {
        this._router.navigate(['alerts', mode], {
            queryParamsHandling: 'preserve'
        });
    }
}
