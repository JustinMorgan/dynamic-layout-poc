import { Component, Input, OnInit, Type } from '@angular/core';

// Generic outer grid component using the dynamic-component approach

@Component({
    selector: 'app-grid',
    template: `
        <app-grid-header [Component]="GridHeaderComponent"></app-grid-header>
        <div *ngFor="let item of list; index as i" [class.dark]="i % 2">
            <app-grid-row [model]="item" [Component]="GridRowComponent"></app-grid-row>
        </div>
    `
})
export class GridComponent<T> implements OnInit {

    @Input() list: T[];
    @Input() GridRowComponent: Type<any>;
    @Input() GridHeaderComponent: Type<any>;

    constructor() { }

    ngOnInit() {
    }

}
