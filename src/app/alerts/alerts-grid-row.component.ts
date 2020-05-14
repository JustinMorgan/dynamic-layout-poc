import { Component } from '@angular/core';
import { BaseGridRowComponent } from '../modes/inheritance/grid/base-grid-row.component';
import { Alert } from './alert.model';

@Component({
    selector: 'alerts-grid-row',
    templateUrl: '../view-templates/alerts/grid-row.html'
})
export class AlertsGridRowComponent extends BaseGridRowComponent<Alert> {}
