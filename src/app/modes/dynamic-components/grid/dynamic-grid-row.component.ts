import { Component, EventEmitter, Input, Output, Type } from '@angular/core';

// Generic grid row component using the dynamic-component approach

@Component({
    selector: 'dynamic-grid-row',
    template: `<ng-template [appHost]="Component" [componentData]="{ model: model, select: select }"></ng-template>`
})
export class GridRowComponent<T> {
    @Input() model: T;
    @Input() Component: Type<any>;
    @Input() @Output() select: EventEmitter<T>;
}
