import { Component, Input, OnInit, Type } from '@angular/core';

// Details component using the dynamic-component approach

@Component({
    selector: 'app-detail',
    template: `<ng-template [appHost]="Component" [componentData]="{ model: model }"></ng-template>`
})
export class DetailComponent<T> implements OnInit {

    @Input() model: T;
    @Input() Component: Type<any>;

    constructor() { }

    ngOnInit() {
    }

}
