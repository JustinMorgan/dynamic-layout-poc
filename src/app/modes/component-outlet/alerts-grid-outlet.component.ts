import { Component, Inject } from '@angular/core';
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
    <div class="grid">
        <alerts-grid-header></alerts-grid-header>

        <div *ngFor="let model of list$ | async; index as i" class="row" [class.dark]="(i + 1) % 2">
            <alerts-grid-row [model]="model" [(select)]="select"></alerts-grid-row>
        </div>
    </div>`
})
export class AlertsGridOutletComponent {

  constructor(@Inject('filteredList$') public list$: Observable<Alert[]>,
              @Inject('select$') public select) { }
}
