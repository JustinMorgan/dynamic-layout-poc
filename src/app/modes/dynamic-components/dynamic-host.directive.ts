import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    Type,
    ViewContainerRef
} from '@angular/core';

@Directive({
    selector: '[appHost]'
})
export class DynamicHostDirective<T> implements OnInit, OnChanges, OnDestroy {

    @Input('appHost') guestComponent: Type<T>;
    @Input() componentData: any;

    guestInstance: T;

    private _componentRef: ComponentRef<T>;

    constructor(private _viewContainerRef: ViewContainerRef,
                private _componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit(): void {
        if (this.guestComponent) {
            this.guestInstance = this.createComponent(this.guestComponent);
            this.bindInputs(this.guestInstance, this.componentData);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.componentData && changes.componentData.currentValue !== changes.componentData.previousValue) {
            this.bindInputs(this.guestInstance, this.componentData);
        }
    }

    ngOnDestroy() {
        if (this._componentRef) {
            this._componentRef.destroy();
        }
    }

    createComponent(component: Type<T>): T {
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(component);
        this._viewContainerRef.clear();
        this._componentRef = this._viewContainerRef.createComponent(componentFactory);
        return this._componentRef.instance;
    }

    bindInputs(componentInstance: T, inputData: any): void {
        if (inputData && componentInstance) {
            for (const prop in inputData) {
                if (inputData.hasOwnProperty(prop)) {
                    componentInstance[prop] = inputData[prop];
                }
            }
        }
    }
}
