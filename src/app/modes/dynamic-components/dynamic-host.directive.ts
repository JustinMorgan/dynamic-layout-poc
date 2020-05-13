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

            if (this.componentData) {
                for(let prop in this.componentData) {
                    if (this.componentData.hasOwnProperty(prop)) {
                        this.guestInstance[prop] = this.componentData[prop];
                    }
                }
            }
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.guestInstance && this.componentData && changes.componentData && changes.componentData.currentValue !== changes.componentData.previousValue) {
            for(let prop in this.componentData) {
                if (this.componentData.hasOwnProperty(prop)) {
                    this.guestInstance[prop] = this.componentData[prop];
                }
            }
        }
    }

    createComponent<T>(component: Type<T>): T {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        const viewContainerRef = this.viewContainerRef;
        viewContainerRef.clear();
        return viewContainerRef.createComponent(componentFactory).instance;
    }

}
