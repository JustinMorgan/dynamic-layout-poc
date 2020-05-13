import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Alert } from '../../alerts/alert.model';

// Details component using the ngTemplateOutlet approach

// Note: You might notice we still have to be coupled to alerts-specific components here.
// This is because of the limitations of not having input components, which is the main
// disadvantage of this approach. It's possible to fully overcome this with the injector,
// but at the cost of awkward code.

@Component({
  selector: 'outlet-alerts-detail',
  template: `
    <alerts-detail [model]="model$ | async"></alerts-detail>
  `
})
export class AlertsDetailOutletComponent implements OnInit {

  constructor(@Inject('detail$') public model$: Observable<Alert>,
              @Inject('selectItem') private _selectItem) { }

  ngOnInit() {
  }

  close(): void {
      this._selectItem(undefined);
  }

}
