import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { AlertsDetailComponent } from './alerts/alerts-detail.component';
import { reducers, metaReducers } from './store/reducers';
import { environment } from '../environments/environment';
import { AlertsComponent } from './alerts/alerts.component';
import { AppRoutingModule } from './app-routing.module';
import { GridComponent } from './modes/dynamic-components/grid/grid.component';
import { DetailComponent } from './modes/dynamic-components/detail/detail.component';
import { SearchComponent } from './shared/search/search.component';
import { AlertsGridRowComponent } from './alerts/alerts-grid-row.component';
import { AlertsGridHeaderComponent } from './alerts/alerts-grid-header.component';
import { AlertEffects } from './store/effects';
import { DynamicHostDirective } from './modes/dynamic-components/dynamic-host.directive';
import { GridRowComponent } from './modes/dynamic-components/grid/grid-row.component';
import { GridHeaderComponent } from './modes/dynamic-components/grid/grid-header.component';
import { AlertsGridOutletComponent } from './modes/component-outlet/alerts-grid-outlet.component';
import { AlertsDetailOutletComponent } from './modes/component-outlet/alerts-detail-outlet.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
            }
        }),
        AppRoutingModule,
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([AlertEffects]),
        StoreRouterConnectingModule.forRoot(),
        !environment.production ? StoreDevtoolsModule.instrument() : []
    ],
    declarations: [
        AppComponent,
        AlertsDetailComponent,
        AlertsComponent,
        GridComponent,
        DetailComponent,
        SearchComponent,
        AlertsGridRowComponent,
        AlertsGridHeaderComponent,
        DynamicHostDirective,
        GridRowComponent,
        GridHeaderComponent,
        AlertsGridOutletComponent,
        AlertsDetailOutletComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
