import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Alert } from '../../alerts/alert.model';

// Grid component using the ngTemplateOutlet approach

// Note: You might notice we still have to be coupled to alerts-specific components here.
// This is because of the limitations of not having input components, which is the main
// disadvantage of this approach. It's possible to fully overcome this with the injector,
// but at the cost of awkward code.

@Component({
  selector: 'outlet-alerts-grid',
  template: `
    <alerts-grid-header></alerts-grid-header>

    <div *ngFor="let model of list$ | async" class="row" [class.dark]="model.id % 2" (click)="select(model)">
      <alerts-grid-row [model]="model"></alerts-grid-row>
    </div>
  `
})
export class AlertsGridOutletComponent implements OnInit {

  constructor(@Inject('filteredList$') public list$: Observable<Alert[]>,
              @Inject('selectItem') private _selectItem) { }

  ngOnInit() {
  }

  select(model): void {
    this._selectItem(model);
  }

}
