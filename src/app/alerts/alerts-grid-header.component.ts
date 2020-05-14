import { Component } from '@angular/core';
import { BaseGridHeaderComponent } from '../modes/inheritance/grid/base-grid-header.component';
import { Alert } from './alert.model';

@Component({
    selector: 'alerts-grid-header',
    templateUrl: '../view-templates/alerts/grid-header.html'
})
export class AlertsGridHeaderComponent extends BaseGridHeaderComponent<Alert> {}
