import { Component, Input, OnInit, Type, Output, EventEmitter } from '@angular/core';

// Generic outer grid component using the dynamic-component approach

@Component({
    selector: 'dynamic-grid',
    template: `
        <div class="grid">
            <dynamic-grid-header [Component]="GridHeaderComponent"></dynamic-grid-header>
            <div *ngFor="let item of list; index as i" [class.dark]="i % 2">
                <dynamic-grid-row [model]="item" [Component]="GridRowComponent" [(select)]="select"></dynamic-grid-row>
            </div>
        </div>`
})
export class GridComponent<T> {
    @Input() list: T[];
    @Input() GridRowComponent: Type<any>;
    @Input() GridHeaderComponent: Type<any>;
    @Input() @Output() select = new EventEmitter<T>();
}
