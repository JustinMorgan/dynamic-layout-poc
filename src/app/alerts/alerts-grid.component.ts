import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Alert } from './alert.model';

@Component({
  selector: 'alerts-grid',
    template: `
        <div class="grid">
            <alerts-grid-header></alerts-grid-header>
            <div *ngFor="let item of list; index as i" [class.dark]="i % 2">
                <alerts-grid-row [model]="item" [(select)]="select"></alerts-grid-row>
            </div>
        </div>`
})
export class AlertsGridComponent {
    @Input() list: Alert[];
    @Input() @Output() select = new EventEmitter<Alert>();
}
