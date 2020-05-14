import { Component, EventEmitter, Input, Output, Type } from '@angular/core';

// Details component using the dynamic-component approach

@Component({
    selector: 'dynamic-detail',
    template: `<ng-template [appHost]="Component" [componentData]="{ model: model, close: close }"></ng-template>`
})
export class DynamicDetailComponent<T> {
    @Input() model: T;
    @Input() Component: Type<any>;
    @Input() @Output() close = new EventEmitter<void>();
}
