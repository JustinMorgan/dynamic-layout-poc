import { Component } from '@angular/core';

// Generic outer grid component using the ng-content approach

@Component({
    selector: 'ngContent-grid',
    template: `
        <div class="grid">
            <ng-content select="[grid-header]"></ng-content>
            <ng-content select="[grid-row]"></ng-content>
        </div>`
})
export class NgContentGridComponent {}
