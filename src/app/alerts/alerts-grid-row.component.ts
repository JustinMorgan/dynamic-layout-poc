import { Component, OnInit, Input } from '@angular/core';
import { Alert } from './alert.model';
import { Store } from '@ngrx/store';
import { IStoreState } from 'src/app/store/reducers';
import { SelectAlertAction } from 'src/app/store/actions';

@Component({
  selector: 'alerts-grid-row',
  template: `
    <div class="row" (click)="select()">
      <div class="cell">{{model.id}}</div>
      <div class="cell">{{model.name}}</div>
    </div>
  `
})
export class AlertsGridRowComponent implements OnInit {

  @Input() model: Alert;

  constructor(private _store: Store<IStoreState>) { }

  ngOnInit() {
  }

  select(): void {
    this._store.dispatch(new SelectAlertAction(this.model));
  }
}
