import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AlertsDetailComponent } from './alerts/alerts-detail.component';
import { AlertsGridHeaderComponent } from './alerts/alerts-grid-header.component';
import { AlertsGridRowComponent } from './alerts/alerts-grid-row.component';
import { AlertsGridComponent } from './alerts/alerts-grid.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { AlertsDetailOutletComponent } from './modes/component-outlet/alerts-detail-outlet.component';
import { AlertsGridOutletComponent } from './modes/component-outlet/alerts-grid-outlet.component';
import { DynamicDetailComponent } from './modes/dynamic-components/detail/dynamic-detail.component';
import { DynamicHostDirective } from './modes/dynamic-components/dynamic-host.directive';
import { DynamicGridHeaderComponent } from './modes/dynamic-components/grid/dynamic-grid-header.component';
import { GridRowComponent } from './modes/dynamic-components/grid/dynamic-grid-row.component';
import { GridComponent } from './modes/dynamic-components/grid/dynamic-grid.component';
import { DynamicTemplateDirective } from './modes/dynamic-templates/dynamic-template.directive';
import { SearchComponent } from './shared/search/search.component';
import { AlertEffects } from './store/effects';
import { metaReducers, reducers } from './store/reducers';
import { BaseDetailComponent } from './modes/inheritance/detail/base-detail.component';
import { BaseGridHeaderComponent } from './modes/inheritance/grid/base-grid-header.component';
import { BaseGridRowComponent } from './modes/inheritance/grid/base-grid-row.component';
import { NgContentGridComponent } from './modes/ng-content/ng-content-grid.component';
import { CustomSerializer } from './store/router-store-serializer';

@NgModule({
    declarations: [
        AppComponent,
        AlertsDetailComponent,
        AlertsComponent,
        GridComponent,
        DynamicDetailComponent,
        SearchComponent,
        AlertsGridRowComponent,
        AlertsGridHeaderComponent,
        DynamicHostDirective,
        GridRowComponent,
        DynamicGridHeaderComponent,
        AlertsGridOutletComponent,
        AlertsDetailOutletComponent,
        HomeComponent,
        DynamicTemplateDirective,
        AlertsGridComponent,
        BaseDetailComponent,
        BaseGridHeaderComponent,
        BaseGridRowComponent,
        NgContentGridComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
            }
        }),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([AlertEffects]),
        StoreRouterConnectingModule.forRoot(),
        !environment.production ? StoreDevtoolsModule.instrument() : []
    ],
    providers: [
        { provide: RouterStateSerializer, useClass: CustomSerializer },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
