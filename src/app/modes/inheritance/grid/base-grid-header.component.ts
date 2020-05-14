import { Input, Component } from '@angular/core';

// Generic grid header component using the simple inheritance approach

@Component({ selector: 'base-grid-header', template: '' })
export class BaseGridHeaderComponent<T> {
    @Input() model: T;
}
