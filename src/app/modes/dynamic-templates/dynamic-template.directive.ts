import {
    Component,
    ComponentFactoryResolver,
    Directive,
    Input,
    OnInit,
    Type,
    ViewContainerRef,
    OnDestroy,
    ComponentRef,
    Compiler,
    NgModuleRef,
    NgModule,
    ViewChild,
    Injector
} from '@angular/core';

@Directive({
    selector: '[templateUrl]'
})
export class DynamicTemplateDirective implements OnInit, OnDestroy {
    @ViewChild('[templateUrl]', {read: ViewContainerRef}) dynamicTemplate;

    @Input() templateUrl: string;

    private _componentRef: ComponentRef<any>;

    constructor(private _viewContainerRef: ViewContainerRef,
                private _compiler: Compiler,
                private _module: NgModuleRef<any>,
                private _injector: Injector,
                private _componentFactoryResolver: ComponentFactoryResolver) { }

    async ngOnInit() {
        const dynamicComponent = await this.createComponentClass(this.templateUrl);
        this.createComponent(dynamicComponent);
        // this._viewContainerRef.createEmbeddedView(this.templateUrl);
    }

    ngOnDestroy() {
        if (this._componentRef) {
            this._componentRef.destroy();
        }
    }

    createComponent<T>(component: Type<T>): T {
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(component);
        this._viewContainerRef.clear();
        this._componentRef = this._viewContainerRef.createComponent(componentFactory);
        return this._componentRef.instance;
    }

    async createComponentClass(templateUrl: string): Promise<Type<any>> {
        const tempComponent = Component({
            // moduleId: this._module.instance.id,
            templateUrl
        })(class TempComponent {});

        return tempComponent;

        // const tempModule = NgModule({declarations: [tempComponent]})(class {});

        // const factories = await this._compiler.compileModuleAndAllComponentsAsync(tempModule);
        // const f = factories.componentFactories[0];
        // const cmpRef = f.create(this._injector, [], null, this._module);
        // cmpRef.instance.name = 'dynamic';

        // this.dynamicTemplate.insert(cmpRef.hostView);

        // return cmpRef.instance;
    }

}
