import { EventEmitter, Input, Output, Component } from '@angular/core';

// Details component using the simple inheritance approach

@Component({ selector: 'base-detail', template: '' })
export class BaseDetailComponent<T> {
    @Input() model: T;
    @Input() @Output() close = new EventEmitter<void>();
}
