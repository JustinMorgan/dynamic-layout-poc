import { Component, Input, OnInit, Type } from '@angular/core';

// Generic grid row component using the dynamic-component approach

@Component({
  selector: 'app-grid-header',
  template: `<ng-template [appHost]="Component" [componentData]="{ model: model }"></ng-template>`
})
export class GridHeaderComponent<T> implements OnInit {

  @Input() model: T;
  @Input() Component: Type<any>;

  constructor() { }

  ngOnInit() {
  }

}
