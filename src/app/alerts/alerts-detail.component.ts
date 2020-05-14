import { Component } from '@angular/core';
import { BaseDetailComponent } from '../modes/inheritance/detail/base-detail.component';
import { Alert } from './alert.model';

@Component({
    selector: 'alerts-detail',
    templateUrl: '../view-templates/alerts/detail.html'
})
export class AlertsDetailComponent extends BaseDetailComponent<Alert> {}
