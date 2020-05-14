import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './alerts/alerts.component';
import { HomeComponent } from './home.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'alerts/:mode', component: AlertsComponent },
    { path: 'alerts/:mode/:selection', component: AlertsComponent },
    { path: 'alerts', redirectTo: 'alerts/dynamicComponent' },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
