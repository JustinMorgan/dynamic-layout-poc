import { Component, Input, Type } from '@angular/core';

// Generic grid header component using the dynamic-component approach

@Component({
    selector: 'dynamic-grid-header',
    template: `<ng-template [appHost]="Component" [componentData]="{ model: model }"></ng-template>`
})
export class DynamicGridHeaderComponent<T> {
    @Input() model: T;
    @Input() Component: Type<any>;
}
