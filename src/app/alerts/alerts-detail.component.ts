import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { SelectAlertAction } from 'src/app/store/actions';
import { IStoreState } from 'src/app/store/reducers';
import { Alert } from './alert.model';

@Component({
    selector: 'alerts-detail',
    template: `
        <h1>
            Alert Detail <button class="active" role="button" (click)="close()">X</button>
        </h1>
        <div>
            <div><b>ID:</b> {{model.id}}</div>
            <div><b>Name:</b> {{model.name}}</div>
        </div>
    `
})
export class AlertsDetailComponent implements OnInit {

    @Input() model: Alert;

    constructor(private _store: Store<IStoreState>) { }

    ngOnInit() {
    }

    close(): void {
        this._store.dispatch(new SelectAlertAction(undefined));
    }

}
