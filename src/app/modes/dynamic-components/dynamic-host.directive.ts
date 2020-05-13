import { Directive, ViewContainerRef, Input, ComponentFactoryResolver, Type, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[appHost]'
})
export class DynamicHostDirective<T> implements OnInit, OnChanges {

    @Input('appHost') guestComponent: Type<T>;
    @Input('componentData') componentData: any;

    guestInstance: T;

    constructor(public viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) { }

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

    createComponent<T>(component: Type<T>): T {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        const viewContainerRef = this.viewContainerRef;
        viewContainerRef.clear();
        return viewContainerRef.createComponent(componentFactory).instance;
    }

    bindInputs(componentInstance: T, inputData: any): void {
        if (inputData && componentInstance) {
            for(let prop in inputData) {
                if (inputData.hasOwnProperty(prop)) {
                    componentInstance[prop] = inputData[prop];
                }
            }
        }
    }
}
