import { EventEmitter, Input, Output, Component } from '@angular/core';

// Generic grid row component using the simple inheritance approach

@Component({ selector: 'base-grid-row', template: '' })
export class BaseGridRowComponent<T> {
    @Input() model: T;
    @Input() @Output() select = new EventEmitter<T>();
}
